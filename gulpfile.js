(function () {
   var gulp = require('gulp'),

   requireDir = require('require-dir'),

   fs = require('fs'),

   sass = require('gulp-ruby-sass'),

   merge_stream = require('merge-stream'),

   sourcemaps = require('gulp-sourcemaps'),

   jshint = require('gulp-jshint'),

   jscs = require('gulp-jscs'),

   concat = require('gulp-concat'),

   stripDebug = require('gulp-strip-debug'),

   rename = require('gulp-rename'),

   cssnano = require('gulp-cssnano'),

   replace = require('gulp-replace'),

   download = require('gulp-download-stream'),

   dir = requireDir('./node_modules/widget-build-tools/'),

   del = require('del'),

   buildTemp = '.buildTemp',

   compiledTemp = '.compiledTemp',

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
         .pipe(gulp.dest('./src/i18n/'))
   });

   // overriden task from widget-build-tools
   gulp.task('compile-translations', function () {
      return gulp.src('./src/i18n/*.json')
         .pipe(gulp.dest(compiledTemp + '/i18n'))
         .pipe(gulp.dest('./dist/i18n/'));
   });

   // overriden task from widget-build-tools
   gulp.task('compile-babel', ['compile-babel2'], function () {
      // adds a js file with the KambiApi version number
      var apiVersion = JSON.parse(fs.readFileSync('package.json'))['kambi-widget-api-version'];
      return gulp.src(compiledTemp + '/js/coreLibrary.js')
         .pipe(replace(/{{expectedApiVersion}}/g, apiVersion))
         .pipe(gulp.dest(compiledTemp + '/js'));
   });

   gulp.task('compile-babel2', [], function () {
      // TODO add babel compilation step once chrome sourcemap bug gets fixed
      // https://bugs.chromium.org/p/chromium/issues/detail?id=369797
      // var babelStream = gulp.src('./src/**/*.js')
      //    .pipe(jshint('.jshintrc'))
      //    .pipe(jshint.reporter('default'))
      //    .pipe(sourcemaps.init())
      //    .pipe(babel({
      //       presets: ['es2015'],
      //       sourceRoot: '../src/'
      //    }))
      //    .pipe(concat('app.js'))
      //    .pipe(sourcemaps.write('.'))
      //    .pipe(gulp.dest('./'+ compiledTemp +'/js/'));
      // var sourceStream = gulp.src('./src/**/*.js')
      //    .pipe(gulp.dest('./'+ compiledTemp +'/js/src/'));
      // return merge_stream(babelStream, sourceStream);

      return gulp.src([
            './src/**/*.js',
            '!./src/js/thirdpartylibs/*.js'
         ])
         .pipe(jshint('.jshintrc'))
         .pipe(jshint.reporter('default'))
         .pipe(jscs())
         .pipe(jscs.reporter())
         .pipe(gulp.dest('./' + compiledTemp));
   });

   // overriden task from widget-build-tools
   gulp.task('app-concat', function () {
      return gulp.src([
            './src/js/thirdpartylibs/*.js',
            './' + compiledTemp + '/**/*.js'
         ])
         .pipe(concat('app.js'))
         .pipe(gulp.dest('./' + buildTemp + '/js'));
   });

   // overriden task from widget-build-tools
   gulp.task('html-replace', function () {
   });

   // overriden task from widget-build-tools
   gulp.task('compile-scss', [], function () {
      var streams = null;

      var scssFiles = [
         './src/scss/app-base-all.scss',
         './src/scss/app-base-icons.scss',
         './src/scss/app-base-layout.scss',
         './src/scss/app-base.scss',
         './src/scss/widgets.scss'
      ];

      scssFiles.forEach(function (file) {
         var scssStream = sass(file, {
               compass: true,
               style: 'expanded',
               lineComments: false,
               sourcemap: true
            })
            .pipe(sourcemaps.write('.', {
               includeContent: false,
               sourceRoot: '../css/src/scss'
            }))
            .pipe(gulp.dest('./' + compiledTemp + '/css'));

         var sourceStream = gulp.src('./src/**/*.scss')
            .pipe(gulp.dest('./' + compiledTemp + '/css/src/'));

         var mergedStream = merge_stream(scssStream, sourceStream);

         if (streams == null) {
            streams = mergedStream;
         } else {
            streams.add(mergedStream);
         }
      });
      return streams;
   });

   // overriden task from widget-build-tools
   gulp.task('css-concat', function () {
      // same as the widget-build-tools but without the concatenation
      return gulp.src('./' + compiledTemp + '/css/**/*.css')
         .pipe(gulp.dest('./dist/css'))
         .pipe(cssnano())
         .pipe(rename({
            suffix: '.min'
         }))
         .pipe(gulp.dest('./dist/css'));
   });

}).call(this);
