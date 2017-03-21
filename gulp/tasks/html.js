var gulp = require('gulp');
var config = require('../config').resHtml;
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

/**
 * app html
 */
gulp.task('app-html',function(){
    return gulp.src(config.app.src+"*.html")
            .pipe(gulp.dest(config.app.dist))
            .pipe(reload({stream: true}));
});

/**
 * Html Watch
 */
gulp.task("html-watch",['app-html'],browserSync.reload);