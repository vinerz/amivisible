var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

gulp.task('clean', function(cb) {
  return del(['lib/*'], cb);
});

gulp.task('build', ['clean'], function() {
  return gulp.src('src/**/*.js')
    .pipe(concat('index.js')) //the name of the resulting file
    .pipe(uglify())
    .pipe(gulp.dest('lib')) //the destination folder
});
