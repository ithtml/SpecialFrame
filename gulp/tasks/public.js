/**
 * Public Builder Sass
 */
var gulp = require('gulp');
/**
 * public Task
 */
gulp.task('public',function(){
    gulp.run('public-sass');
    //gulp.run('public-miniCss');
    gulp.run('public-miniJs');
    //gulp.run('public-html');
});