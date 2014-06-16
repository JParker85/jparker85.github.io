var gulp           = require('gulp'),
    connect        = require('gulp-connect'),
    csso           = require('gulp-csso'),
    sass           = require('gulp-sass'),
    rename         = require("gulp-rename");

// Styles.
gulp.task('styles', function() {
  return gulp.src('src/styles/main.css')
    .pipe(csso())
    .pipe(rename('styles/main.min.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('css', function() {
  return gulp.src('src/assets/stylesheets/*.scss')
    .pipe(
      sass( {
        includePaths: ['src/styles'],
        errLogToConsole: true
      } ) )
    .pipe(csso())
    .pipe(gulp.dest('dist/styles'));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/img/'));
});

// Templates
gulp.task('templates', function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist/'))
});

// Build
gulp.task('build', ['images','styles','templates']);

// Connect - let's get this party started!
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    port: 9000
  });
});

// Watch
gulp.task('watch', function() {
    gulp.watch('src/styles/**/*.css', ['styles']);
    gulp.watch('src/img/**/*', ['images']);
    gulp.watch('src/**/*.html', ['templates']);
});

// Default task
gulp.task('default', function() {
    gulp.start('build', 'connect', 'watch');
});
