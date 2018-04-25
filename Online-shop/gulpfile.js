"use strict";

// Dependencies
var 
  gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync').create(),
	runSequence = require('run-sequence');

gulp.task('sass', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({
    	stream: true 
    }));
});

gulp.task('browserSync', function() {
  browserSync.init({
    files: ['index.html', 'product.html'],
    server: {
      baseDir: './',
      directory: true
    },
  })
})
 
gulp.task('watch', ['sass', 'browserSync'], function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('./*.html', browserSync.reload); 
  gulp.watch('./js/**/*.js', browserSync.reload); 
});
