const gulp = require('gulp');
const wrap = require('gulp-wrap');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const ts = require('gulp-typescript').createProject('tsconfig.json');

gulp.task('default', function() {
  return gulp.src('src/code.ts')
    .pipe(ts())
    .pipe(uglify())
    .pipe(wrap({ src: './src/index.html' }))
    .pipe(rename({ basename: 'index', extname: '.html' }))
    .pipe(gulp.dest('out'));
});
