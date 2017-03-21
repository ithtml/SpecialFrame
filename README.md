
#Gulp插件介绍注释
// 载入外挂
var gulp = require('gulp'),  
	browserify = require('browserify'),//这里用不上，管理js依赖的
	source = require('vinyl-source-stream'),//同样这里用不上，和上面那个一起的
	uglify = require('gulp-uglify'),//混淆js
	clean = require('gulp-clean'),//清理文件
	notify = require('gulp-notify'),//加控制台文字描述用的
	buffer = require('vinyl-buffer'),
	less = require('gulp-less'),//转换less用的
	autoprefixer = require('gulp-autoprefixer'),//增加私有变量前缀
	minifycss = require('gulp-minify-css'),//压缩
	concat = require('gulp-concat'),//合并
	fileinclude = require('gulp-file-include'),// include 文件用
	template = require('gulp-template'),//替换变量以及动态html用
	rename = require('gulp-rename'),//重命名
	webserver = require('gulp-webserver'),//一个简单的server，用python的SimpleHttpServer会锁文件夹
	imagemin = require('gulp-imagemin'),//图片压缩
	gulpif  = require('gulp-if'),//if判断，用来区别生产环境还是开发环境的
	rev  = require('gulp-rev'),//加MD5后缀
	revReplace = require('gulp-rev-replace'),//替换引用的加了md5后缀的文件名，修改过，用来加cdn前缀
	addsrc = require('gulp-add-src'),//pipeline中途添加文件夹，这里没有用到
	del = require('del'),//也是个删除··· 
	vinylPaths = require('vinyl-paths'),//操作pipe中文件路径的，加md5的时候用到了
	runSequence = require('run-sequence');//控制task顺序

	var gulp = require('gulp'),
    rename = require("gulp-rename"),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require("gulp-uglify"),
    minifyCss = require("gulp-minify-css"),
    minifyHtml = require("gulp-minify-html"),
    $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

//var base64 = require('gulp-base64');
// //basic example 
// gulp.task('build', function () {
//     return gulp.src('./css/*.css')
//         .pipe(base64())
//         .pipe(concat('main.css'))
//         .pipe(gulp.dest('./public/css'));
// });
// //example with options 
// gulp.task('build', function () {
//     return gulp.src('./css/*.css')
//         .pipe(base64({
//             baseDir: 'public',
//             extensions: ['svg', 'png', /\.jpg#datauri$/i],
//             exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
//             maxImageSize: 8*1024, // bytes 
//             debug: true
//         }))
//         .pipe(concat('main.css'))
//         .pipe(gulp.dest('./public/css'));
// });
//替换css里面的图片地址
// gulp.task("revCss",['minImg'],function(){
//     return gulp.src(['rev/img/*.json', 'src/css/*.css'])
//         .pipe(revCollector())                                   
//         .pipe(gulp.dest('temp/css'))
//         .pipe(notify({ message: 'revCss task complete' }));
// });
// //定义一个压缩css文件并md5命名
// gulp.task('base64',['revCss'], function () {
//     return gulp.src('temp/css/*.css')
//     .pipe(base64())
//     .pipe(gulp.dest('temp/css1'))
//     .pipe(notify({ message: 'base64 task complete' }));
// });
// //定义一个压缩css文件并md5命名
// gulp.task('minCss',['base64'], function () {
//     return gulp.src('temp/css1/*.css')
//     .pipe(minifycss())
//     .pipe(rev())
//     .pipe(gulp.dest('dist/css'))
//     .pipe(rev.manifest())
//     .pipe(gulp.dest('rev/css'))
//     .pipe(notify({ message: 'minCss task complete' }));
// });
// gulp.task('watch', ['browsersync'], function() { gulp.watch(config.jekyll, ['jekyll-rebuild']);
//     gulp.watch(config.sass, ['sass', 'scsslint']);
//     gulp.watch(config.scripts, ['scripts', 'jshint']);
//     gulp.watch(config.images, ['images']);
//     gulp.watch(config.svg, ['copy:fonts']);
//     gulp.watch(config.sprites, ['sprites']); 
// });

//gulp.task(‘default‘, ["browser-sync"]);
//静态服务器
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('minify-js', function() {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-css', function() {
    gulp.src('src/css/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-html', function() {
    gulp.src('src/html/*.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist/html'));
});

gulp.task('concat', function() {
    gulp.src('src/js/*.js')
        .pipe(concat('common.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('compile-sass', function() {
    gulp.src('src/sass/app/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

//--- zhuanti start----
var zt_root = 'src/zhuanti/';
gulp.task('zt-css', function() {
    // gulp.src(zt_root + 'res/css/*/*.css')
    //     .pipe(sass())
    //     .pipe();
});
//--- zhuanti end------

//default
gulp.task('def', function() {

});
//develop
gulp.task('dev', ['browser-sync'], function() {
    //gulp.src("src/zhuanti/*/")

});
//--release
gulp.task('rel', ['browser-sync'], function() {

});


================
// 载入外挂
var gulp = require('gulp'), 
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');
 
// 样式
gulp.task('styles', function() { 
  return gulp.src('src/styles/main.scss')
    .pipe(sass({ style: 'expanded', }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});
 
// 脚本
gulp.task('scripts', function() { 
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});
 
// 图片
gulp.task('images', function() { 
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});
 
// 清理
gulp.task('clean', function() { 
  return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false})
    .pipe(clean());
});
 
// 预设任务
gulp.task('default', ['clean'], function() { 
    gulp.start('styles', 'scripts', 'images');
});
 
// 看守
gulp.task('watch', function() {
 
  // 看守所有.scss档
  gulp.watch('src/styles/**/*.scss', ['styles']);
 
  // 看守所有.js档
  gulp.watch('src/scripts/**/*.js', ['scripts']);
 
  // 看守所有图片档
  gulp.watch('src/images/**/*', ['images']);
 
  // 建立即时重整伺服器
  var server = livereload();
 
  // 看守所有位在 dist/  目录下的档案，一旦有更动，便进行重整
  gulp.watch(['dist/**']).on('change', function(file) {
    server.changed(file.path);
  });
 
});