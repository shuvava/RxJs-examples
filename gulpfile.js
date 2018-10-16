const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const gutil = require('gulp-util');
const logger = require('gulp-logger');
var sourcemaps = require('gulp-sourcemaps');

const verbose = true;

function iif(test, fn) {
    if (test) {
        return fn.apply(null, Array.prototype.slice.call(arguments,2)); // eslint-disable-line
    }
    return gutil.noop();
}

gulp.task('default', () => {
    console.log(`current dir : ${__dirname}`);
    return watch('src/*.js', { ignoreInitial: false })
    // return gulp.src('./src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(iif(verbose === true, logger, {
            beforeEach: 'Starting babelling... ',
            afterEach: ' Babelling complete!',
        }))
        // .pipe(babel({
        //     presets: ['env', 'stage-2'],
        // }))
        .pipe(babel({
            presets: ['@babel/env'],
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'));
});
