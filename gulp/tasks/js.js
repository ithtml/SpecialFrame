var gulp = require('gulp');
var uglify = require("gulp-uglify");
var rename = require('gulp-rename');
var config = require('../config').resJs;
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
/**
 * Mini Js
 */
gulp.task('miniJs',function(){
    gulp.run('public-miniJs');
    gulp.run('app-miniJs');
});

gulp.task('public-miniJs',function(){
   return gulp.src(config.public.src + '*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(config.public.dist))
        .pipe(reload({stream: true}));
});

gulp.task('app-miniJs',function(){
    return gulp.src(config.app.src + '*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(config.app.dist))
        .pipe(reload({stream: true}));
});
/**
 * Js Watch
 */
gulp.task("js-watch",['miniJs'],browserSync.reload);