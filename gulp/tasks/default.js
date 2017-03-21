var gulp = require('gulp');
var config = require('../config');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('default', function () {
    console.log("print info by default.js");

    gulp.run('public');
    gulp.run('app');
    gulp.run('runServer');
});

// 静态服务器 + 监听 scss/html 文件
gulp.task('runServer', function () {
    browserSync.init({
        server: {
            baseDir: "./dist/app/"
        }
    });
    /**
     * js resource
     */
    gulp.watch(config.resJs.public + "*.js", ['public-miniJs']);
    gulp.watch(config.resJs.app + "*.js", ['app-miniJs']);
    /**
     * css resource
     */
    gulp.watch(config.resSass.public + "*.css", ['public-miniCss']);
    gulp.watch(config.resSass.app + "*.css", ['app-miniCss']);
    /**
     * html resource
     */
    gulp.watch(config.resHtml.app + "*.html", ['app-html']).on('change', reload);
});
