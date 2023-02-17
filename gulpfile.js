const gulp = require('gulp');
const wrap = require('gulp-wrap');
const uglify = require('gulp-uglify');

gulp.task('default', function() {
  return gulp.src('code.js')
    .pipe(wrap('javascript:(<%= contents %>());'))
    .pipe(uglify())
    .pipe(gulp.dest('out'));
});
