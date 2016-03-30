(function () {
   var gulp = require('gulp'),

   requireDir = require('require-dir'),

   fs = require('fs'),

   sass = require('gulp-ruby-sass'),

   merge_stream = require('merge-stream'),

   sourcemaps = require('gulp-sourcemaps'),

   jshint = require('gulp-jshint'),

   jscs = require('gulp-jscs'),

   stripDebug = require('gulp-strip-debug'),

   rename = require('gulp-rename'),

   cssnano = require('gulp-cssnano'),

   replace = require('gulp-replace'),

   dir = requireDir('./node_modules/widget-build-tools/'),

   buildTemp = '.buildTemp',

   compiledTemp = '.compiledTemp';

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

      return gulp.src('./src/**/*.js')
         .pipe(jshint('.jshintrc'))
         .pipe(jshint.reporter('default'))
         .pipe(jscs())
         .pipe(jscs.reporter())
         .pipe(gulp.dest('./' + compiledTemp));
   });

   // overriden task from widget-build-tools
   gulp.task('html-replace', function () {
   });

   // overriden task from widget-build-tools
   gulp.task('compile-translations', function () {
      return gulp.src('./src/i18n/*.json')
         .pipe(gulp.dest(compiledTemp + '/i18n'))
         .pipe(gulp.dest('./dist/i18n/'));
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

   gulp.task('publish', ['publish-version'], function () {
      var publisher = awspublish.create({
         params: {
            Bucket: 'kambi-widgets'
         }
      });

      var headers = {
         'Cache-Control': 'max-age=300, public'
      };

      var stream = gulp.src(['./dist/**/*'])
         .pipe(rename(function ( path ) {
            path.dirname = '/lib/dist/' + path.dirname;
         }))
         .pipe(publisher.publish(headers, {
            // force: true
         }))
         .pipe(publisher.cache())
         .pipe(awspublish.reporter())
         .on('finish', function () {
            setTimeout(function () {
               process.exit(0);
            }, 100);
         });
      return stream;
   });

   gulp.task('publish-version', function () {
      var publisher = awspublish.create({
         params: {
            Bucket: 'kambi-widgets'
         }
      });

      var headers = {
         'Cache-Control': 'max-age=315360000, public'
      };

      var stream = gulp.src(['./dist/**/*'])
         .pipe(prompt.prompt({
            type: 'confirm',
            message: '\033[33mBefore publishing \033[4m\033[1m\033[33mmake sure\033[0m\033[33m you\'ve bumped the version\n\r' +
            ' \033[4m\033[1m\033[33mAre you sure\033[0m\033[33m you want to continue ?',
            default: false,
            name: 'start'
         }, function ( answer ) {
            if ( !answer.start ) {
               process.exit(0);
            }
         }))
         .pipe(rename(function ( path ) {
            path.dirname = '/lib/dist/' + latestVersion + '/' + path.dirname;
         }))
         .pipe(publisher.publish(headers, {
            // force: true
         }))
         .pipe(publisher.cache())
         .pipe(awspublish.reporter());
      return stream;
   });

   gulp.task('publish-src', function () {
      var publisher = awspublish.create({
         params: {
            Bucket: 'kambi-widgets'
         }
      });

      var headers = {};

      return gulp.src(['./src/**/*'])
         .pipe(rename(function ( path ) {
            path.dirname = '/lib/src/' + path.dirname;
         }))
         .pipe(publisher.publish(headers, {
            // force: true
         }))
         .pipe(publisher.cache())
         .pipe(awspublish.reporter());
   });

}).call(this);
