'use strict';

var gulp = require('gulp'),

   del = require('del'),

   path = require('path'),

   jshint = require('gulp-jshint'),

   babel = require('gulp-babel'),

   sourcemaps = require('gulp-sourcemaps'),

   jscs = require('gulp-jscs'),

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

var projectRoot = '.';

var transpileDir = projectRoot + '/src/transpiled/';


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
   },
};

gulp.task('clean-temp', function () {
   return del.sync(transpileDir);
});

gulp.task('clean', ['clean-temp'], function () {
   return del.sync('./dist/');
});

gulp.task('default', ['clean'], function () {
   return gulp.start('build');
});

gulp.task('build', ['compile']);

gulp.task('compile', ['compile-babel']);

gulp.task('watch', [], function () {
   gulp.watch(paths.js.source + '/**/*.js', ['compile-babel']);
});

/**
* Fetches the i18n strings from Kambi into /src/i18n/. Deletes existing locales before fetching
*/
gulp.task('fetch-translations', function () {
   var supportedLanguagesFiles = [];
   supportedLanguages.forEach(function ( locale ) {
      supportedLanguagesFiles.push({
         file: locale + '.json',
         url: 'https://publictest-static.kambi.com/sb-mobileclient/kambi/1.245.0.0/locale/' + locale + '/locale.js'
      });
   });

   del.sync('./src/i18n');
   return download(supportedLanguagesFiles)
      .pipe(replace('(function(require, define){\ndefine({', '{\n\t"LOCALE_IMPORT": "---",'))
      .pipe(replace(');})(_kbc.require, _kbc.define);', ''))
      .pipe(gulp.dest('./src/i18n/'));
});

/**
* Compiles all js files using Babel
*/
gulp.task('compile-babel', [], function () {
   var sourceRootMap = function (file) {
      return '../' + path.relative(file.history[0], paths.js.source) + paths.js.sourceRoot;
   }
   return gulp.src(paths.js.source + '/**/*.js')
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
