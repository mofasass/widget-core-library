'use strict';


var download = require('gulp-download-stream'),
   replace = require('gulp-replace'),
   del = require('del'),
   path = require('path'),
   jshint = require('gulp-jshint'),
   fs = require('fs'),
   babel = require('gulp-babel'),
   sourcemaps = require('gulp-sourcemaps'),
   stripDebug = require('gulp-strip-debug'),
   concat = require('gulp-concat'),
   jscs = require('gulp-jscs'),
   jsdoc = require('gulp-jsdoc3'),
   awspublish = require('gulp-awspublish'),
   mergeStream = require('merge-stream'),
   rename = require('gulp-rename'),
   awsSdk = require('aws-sdk'),

   supportedLanguages = [
      'cs_CZ',
      'da_DK',
      'de_AT',
      'de_CH',
      'de_DE',
      'el_GR',
      'en_AU',
      'en_GB',
      'es_ES',
      'et_EE',
      'fi_FI',
      'fr_BE',
      'fr_CH',
      'fr_FR',
      'hu_HU',
      'it_IT',
      'lt_LT',
      'lv_LV',
      'nl_BE',
      'nl_NL',
      'no_NO',
      'pl_PL',
      'pt_BR',
      'pt_PT',
      'ro_RO',
      'ru_RU',
      'sv_SE',
      'tr_TR'
   ];

require('./gulpVersionBumper.js');

var projectRoot = '.';

var transpileDir = projectRoot + '/src/transpiled/';

var buildDir = projectRoot + '/dist/';

// All file paths used in the gulp file are inside this object
var paths = {
   js: {
      source: projectRoot + '/src/js/',
      transpiled: transpileDir + '/js/',
      sourceRoot: '/js/'
   },
   css: {
      source: projectRoot + '/src/scss/',
      transpiled: transpileDir + '/css/',
      sourceRoot: '../../src/scss/'
   }
};

gulp.task('clean-temp', function () {
   return del.sync(transpileDir);
});

gulp.task('clean', ['clean-temp'], function () {
   return del.sync(['./dist/', './docs/']);
});

gulp.task('default', ['clean'], function () {
   return gulp.start('build');
});

gulp.task('build', ['bundle']);

gulp.task('bundle', ['compile'], function () {
   gulp.src(paths.js.transpiled + '**/*.js')
      .pipe(concat('core.js'))
      .pipe(stripDebug())
      .pipe(gulp.dest(buildDir));
});

gulp.task('compile', ['compile-babel']);

gulp.task('watch', [], function () {
   gulp.watch(paths.js.source + '/**/*.js', ['compile-babel']);
});

/**
 * Fetches the i18n strings from Kambi into /src/i18n/. Deletes existing locales before fetching
 */
gulp.task('fetch-translations', function () {
   var supportedLanguagesFiles = [];
   supportedLanguages.forEach(function (locale) {
      supportedLanguagesFiles.push({
         file: locale + '.json',
         url: 'https://ctd-static.kambi.com/development/bc/html5-client/gm-develop/kambi/1.280.1.0/locale/' + locale + '/locale.js'
      });
   });

   del.sync('./src/i18n');
   return download(supportedLanguagesFiles)
      .pipe(replace('(function(require, define){\ndefine({', '{\n\t"LOCALE_IMPORT": "---",'))
      .pipe(replace('window._kbc.locale=', ''))
      .pipe(replace(');})(_kbc.require, _kbc.define);', ''))
      .pipe(replace('};', '}'))
      .pipe(gulp.dest('./src/i18n/'));
});

/**
 * Generates the jsdoc documentation
 */
gulp.task('documentation', function (cb) {
   del.sync('./docs/');
   gulp.src([
      'README.md',
      './src/js/**/*.js',
   ], {
      read: false,
   })
      .pipe(jsdoc({
         'tags': {
            "allowUnknownTags": true
         },
         'source': {
            'excludePattern': "(^|\\/|\\\\)_"
         },
         "opts": {
            'destination': './docs/',
            'tutorials': './tutorials/',
            'tutorial': './tutorials/'
         },
         "plugins": [
            "plugins/markdown"
         ],
         "templates": {
            "cleverLinks": false,
            "monospaceLinks": false,
            "default": {
               "outputSourceFiles": true
            },
            "path": "ink-docstrap",
            "theme": "cerulean",
            "navType": "vertical",
            "linenums": true,
            "dateFormat": "MMMM Do YYYY, h:mm:ss a"
         }
      }, cb));
});


var publishDocs = function (awsPath) {
   var publisher = awspublish.create({
      'region': 'eu-west-1',
      'params': {
         'Bucket': 'kambi-widgets.globalmouth.com'
      }
   });

   return gulp.src(['./docs/**/*'])
      .pipe(rename(function (path) {
         path.dirname = awsPath + path.dirname;
      }))
      .pipe(publisher.publish({}, {}))
      .pipe(publisher.cache())
      .pipe(awspublish.reporter());
};

/**
 * Publishes the jsdoc documentation to S3 under bucket
 * 'kambi-widgets.globalmouth.com' publishes twice, once under the
 * project version number and once under 'latest'
 */
gulp.task('publish-documentation', ['documentation'], function () {
   console.log('\n\nPublishing documentation');
   var version = JSON.parse(fs.readFileSync('package.json'))['version'];
   var stream1 = publishDocs('/docs/' + version + '/');
   var stream2 = publishDocs('/docs/latest/');
   return mergeStream(stream1, stream2);
});

/**
 * Compiles all js files using Babel
 */
gulp.task('compile-babel', function () {
   var sourceRootMap = function (file) {
      return '../' + path.relative(file.history[0], paths.js.source) + paths.js.sourceRoot;
   };
   var apiVersion = JSON.parse(fs.readFileSync('package.json'))['kambi-widget-api-version'];
   return gulp.src(paths.js.source + '/**/*.js')
      .pipe(replace(/\'{{expectedApiVersion}}\'/g, '\'' + apiVersion + '\''))
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('default'))
      .pipe(jscs())
      .pipe(jscs.reporter())
      .pipe(sourcemaps.init())
      .pipe(babel({
         presets: ['es2015']
      }))
      .pipe(sourcemaps.write('.', {
         includeContent: false,
         sourceRoot: sourceRootMap
      }))
      .pipe(gulp.dest(paths.js.transpiled));
});
