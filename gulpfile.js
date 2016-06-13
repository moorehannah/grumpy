var gulp = require('gulp');
var cache = require('gulp-cache');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var useref = require('gulp-useref');
var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');

var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

//BrowserSync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  });
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//Compile Sass
gulp.task('sass', function() {
    return gulp.src('app/css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// include scripts
gulp.task('scripts', function() {
    return gulp.src('app/js/*.js')
        .pipe(gulp.dest('dist/js'));
});

gulp.task('images', function(){
  return gulp.src('app/images/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin()))
  .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', function (){
// Watch Files For Changes
    gulp.watch('app/css/*.scss', ['sass']);
    gulp.watch('app/js/*.js', ['lint', 'scripts']);
    gulp.watch('app/*.html', browserSync.reload); 
});

// minify css and js
gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('default', function (callback) {
  runSequence(['lint', 'sass', 'scripts', 'browserSync', 'watch'],
    callback
  );
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['sass', 'images', 'scripts', 'useref'],
    callback
  );
});