(function () {
   require('./gulpVersionBumper.js');

   var gulp = require('gulp'),

      jshint = require('gulp-jshint'),

      concat = require('gulp-concat'),

      stripDebug = require('gulp-strip-debug'),

      awspublish = require('gulp-awspublish'),

      uglify = require('gulp-uglify'),

      del = require('del'),

      rename = require('gulp-rename'),

      sass = require('gulp-ruby-sass'),

      sourcemaps = require('gulp-sourcemaps'),

      cssnano = require('gulp-cssnano'),

      runSequence = require('run-sequence'),

      latestVersion = require('./package.json').version;

   gulp.task('default', ['build-js', 'build-css', 'copy-fonts'], function () {

   });

   gulp.task('build-js', [], function () {
      return gulp.src('./src/**/*.js')
         .pipe(jshint('.jshintrc'))
         .pipe(jshint.reporter('default'))
         .pipe(concat('app.js'))
         .pipe(gulp.dest('./dist/js'))
         .pipe(stripDebug())
         .pipe(uglify())
         .pipe(rename({ suffix: '.min' }))
         .pipe(gulp.dest('./dist/js'));
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

   gulp.task('compile-scss', ['compile-kambi-widget-scss'], function () {
      return sass('./src/scss/*.scss', {
         compass: true,
         style: 'expanded',
         lineComments: false,
         sourcemap: true
      })
         .pipe(sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: '../css/src/'
         }))
         .pipe(gulp.dest('./src/css'));
   });

   gulp.task('compile-kambi-widget-scss', function () {
      return gulp.src('src/scss/includes/_kambi-css.scss')
         .pipe(rename('widgets.css'))
         .pipe(gulp.dest('./src/css/'));
   });

   gulp.task('css-nano', function () {
      return gulp.src('./src/css/*.css')
         .pipe(gulp.dest('./dist/css'))
         .pipe(cssnano())
         .pipe(rename({
            suffix: '.min'
         }))
         .pipe(gulp.dest('./dist/css'));
   });

   gulp.task('clean-css', function () {
      del.sync('./dist/css');
   });

   gulp.task('copy-fonts', function () {
      return gulp.src('./src/fonts/*')
         .pipe(gulp.dest('./dist/fonts/'));
   });

   gulp.task('build-css', ['clean-css', 'compile-scss'], function ( cb ) {
      runSequence(['css-nano'], cb);
   });

}).call(this);
