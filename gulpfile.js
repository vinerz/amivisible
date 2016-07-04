var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

gulp.task('clean', function(cb) {
  return del(['lib/*'], cb);
});

gulp.task('bundle', ['clean'], function() {
  return gulp.src('src/index.js')
    .pipe(sourcemaps.init())
    .pipe(rename('bundle.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('lib'));
});
