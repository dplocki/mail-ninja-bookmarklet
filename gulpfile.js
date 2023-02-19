const gulp = require('gulp');
const wrap = require('gulp-wrap');
const uglify = require('gulp-uglify');
const ts = require('gulp-typescript').createProject('tsconfig.json');

gulp.task('default', function() {
  return gulp.src('src/code.ts')
    .pipe(ts())
    .pipe(uglify())
    .pipe(wrap('javascript:(function(){<%= contents %>})()'))
    .pipe(gulp.dest('out'));
});
