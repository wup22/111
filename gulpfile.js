// 告诉gulp 应该做哪些任务
//创建gulp对象
var gulp = require('gulp');

/*
	两个参数
	第一个参数  任务的名字
	第二个参数  任务的回调函数

 */

gulp.task('hello', function(){
	console.log('hello world');
})

/*
	实现index.html
	将index.html，拷贝到dist目录
 */
gulp.task('copy-01page', function(){
	return gulp.src('*.html')
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload());
})

/*
	实现图片的拷贝
 */
gulp.task('images', function(){
	//拷贝jpg文件
	// return gulp.src("images/*.jpg").pipe(gulp.dest("dist/images"));
	// 拷贝jpg 和 png
	// return gulp.src("images/*.{jpg,png}").pipe(gulp.dest('dist/images'));
	// 
	// 文件夹里面的图片如何拷贝
	// return gulp.src("images/*/*").pipe(gulp.dest('dist/images'));
	// 
	// 全部拷贝过来
	return gulp.src("images/**/*")
	.pipe(gulp.dest('dist/images'))
	.pipe(connect.reload());
})

/*

	多个文件拷贝到一个文件夹里
	剔除一些文件
 */

gulp.task('data', function(){
	return gulp.src(["*.json", "*.txt", "!package.json", "!package-lock.json"])
	.pipe(gulp.dest("dist/data"))
	.pipe(connect.reload());
})

/*
	一次性执行上述三个任务

 */
gulp.task('build', ["copy-01page", "images", "data"], function(){
	//三个任务同时启动，异步执行的
	console.log('编译成功');
	//当所有任务结束以后执行的函数
})

/*
	监听

 */
gulp.task('watch', function(){
	/*
		两个参数
		第一个参数，是我们要检测的文件路径，注意如果是一个路径直接传参，如果超过一个路径直接写数组
		第二个参数，如果检测文件发生改变，去执行的任务，必须是数组

	 */
	gulp.watch('*.html', ['copy-01page']);
	gulp.watch("images/**/*", ['images']);
	gulp.watch(["*.json", "*.txt", "!package.json", "!package-lock.json"], ['data']);
	gulp.watch(["css/03goods-particular.scss","css/02goodsList.scss","css/01page.scss","css/06cart.scss"], ["scss"]);
	// gulp.watch(["js/03goods-particular.js"], ['concat']);
	gulp.watch(["js/01page.js","js/02goodsList.js","js/03goods-particular.js","js/06cart.js"], ['concat2']);
})

/*
	编译scss变成css文件
	【注】css的编写，可以使用函数，或者使用循环就可以了。
	用了scss以后，我们编写css的时候，就可以像编写js代码一样，应用一些语法，快速编程。
	
	【注】css怎么写，scss中也怎么写。
 */

/*
	scss文件写好以后，要编译css文件
	gulp-scss
	gulp-sass-china  windows下使用

 */
/*
	使用插件
	1、安装插件
		npm install 插件名字 --save-dev
		可以简写为：
		npm i 插件名字 -D
	2、插件引入
		var 变量名 = require('插件名字');
	3、使用插件

 */
/*
	压缩css的插件 gulp-minify-css

 */
var scss = require('gulp-sass-china');
var minifyCSS = require('gulp-minify-css');
// require('gulp-sass-china');
gulp.task('scss', function(){
	return gulp.src(['css/03goods-particular.scss','css/02goodsList.scss',"css/01page.scss",'css/06cart.scss'])
	.pipe(scss())
	.pipe(gulp.dest('dist/css'))
	.pipe(minifyCSS())//压缩css
	.pipe(rename('01page.min.css'))
	.pipe(gulp.dest('dist/css'))
	.pipe(connect.reload());
})


gulp.task('common', function(){
	return gulp.src('css/common.scss')
	.pipe(scss())
	.pipe(gulp.dest('dist/css'))
	// .pipe(minifyCSS())
	// .pipe(rename('common.min.css'))
	// .pipe(gulp.dest('dist/css'))
	.pipe(connect.reload());
})






var connect = require('gulp-connect');

gulp.task('server', function(){
	/*
		让文件发生改变以后，自动更新
		并且页面上自动更新

	 */
	connect.server({
		root: 'dist', //设置根目录
		port: 8888,
		livereload: true //实时刷新
	})
})

//设置默认的gulp任务
gulp.task('default', ["server", 'watch']);


/*
	合并两个文件成为一个文件
	gulp-concat()
	
	压缩js文件
	gulp-uglify

	开发版本  xxx.js
	上线版本  xxx.min.js

	gulp-rename 重命名
 */
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
/*gulp.task('concat', function(){
	return gulp.src("js/03goods-particular.js")
	.pipe(concat("03goods-particular.js"))
	.pipe(gulp.dest("dist/js"))
	.pipe(uglify())//压缩js
	.pipe(rename("01page.min.js"))
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
})*/

gulp.task('concat2', function(){
	return gulp.src(["js/01page.js","js/02goodsList.js","js/03goods-particular.js","js/06cart.js"])
	// .pipe(concat("02goodsList.js"))
	// .pipe(gulp.dest("dist/js"))
	// .pipe(uglify())//压缩js
	// .pipe(rename("01page.min.js"))
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
})





















