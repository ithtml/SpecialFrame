/**
 * App Builder Sass
 */
var gulp = require('gulp');
/**
 * App Task
 */
gulp.task('app',function(){
    gulp.run('app-sass');
    //gulp.run('app-miniCss');
    gulp.run('app-miniJs');
    gulp.run('app-html');
});