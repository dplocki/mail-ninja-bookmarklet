const gulp = require('gulp');
const wrap = require('gulp-wrap');
const uglify = require('gulp-uglify');

gulp.task('default', function() {
  return gulp.src('code.js')
    .pipe(uglify())
    .pipe(wrap('javascript:(<%= contents %>(location.href));'))
    .pipe(gulp.dest('out'));
});
