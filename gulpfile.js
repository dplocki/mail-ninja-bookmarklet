const gulp = require('gulp');
const wrap = require('gulp-wrap');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const ts = require('gulp-typescript').createProject('tsconfig.json');
const packageJson = require('./package.json');

gulp.task('default', function() {
  return gulp.src('src/code.ts')
    .pipe(ts())
    .pipe(uglify())
    .pipe(wrap({ src: './src/index.html' }, { version: packageJson.version }))
    .pipe(rename({ basename: 'index', extname: '.html' }))
    .pipe(gulp.dest('out'));
});
