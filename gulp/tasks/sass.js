var gulp = require('gulp');
var sass = require('gulp-sass');
var miniCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var config = require('../config').resSass;
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
/**
 * Mini Css
 */
gulp.task('miniCss',function(){
    gulp.run('public-miniCss');
    gulp.run('app-miniCss');
});

gulp.task('public-miniCss',['public-sass'],function(){
   return gulp.src(config.public.src + '*.css')
        .pipe(miniCss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(config.public.dist));
});

gulp.task('app-miniCss',['app-sass'],function(){
    return gulp.src(config.app.src + '*.css')
        .pipe(miniCss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(config.app.dist));
});

/**
 * Sass
 */
gulp.task('sass',function(){
    gulp.run('public-sass');
    gulp.run('app-sass');
});
gulp.task('public-sass', function () {
    return gulp.src(config.public.src + "*.scss")
        .pipe(sass())
        .pipe(gulp.dest(config.public.src))
        .pipe(reload({stream: true}));
});
gulp.task('app-sass', function () {
    return gulp.src(config.app.src + "*.scss")
        .pipe(sass())
        .pipe(gulp.dest(config.app.src))
        .pipe(reload({stream: true}));
});
/**
 * Sass Watch
 */
gulp.task("sass-watch",['miniCss'],browserSync.reload);