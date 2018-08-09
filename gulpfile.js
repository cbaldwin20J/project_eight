// 'use strict' is a javascript thing, not necessary but useful.
'use strict';

const gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	maps = require('gulp-sourcemaps');

// so to run this task, in the console we do 'gulp concatScripts'.
gulp.task('concatScripts', function(){
	// here we gather all of our javascript files.
	// make sure to order them the way you would in an index.html file.
	gulp.src([
		'js/global.js',
		'js/circle/autogrow.js',
		'js/circle/circle.js'])
	// this will create our source maps
	.pipe(maps.init())
	// this concats them all into this one file 'app.js'
	// (it will create the file for us)
	.pipe(concat('app.js'))
	// this will put the source maps in the same folder
	// as the gulp.dest below which is 'dist/js'
	.pipe(maps.write('./'))
	// this will put the 'app.js' file in the folder 'js'.
	.pipe(gulp.dest("dist/js"));
});

// call 'gulp minifyScripts' to run this. Its important this goes
// after the 'concatScripts' above.
gulp.task('minifyScripts', function(){
	// get the file you want to minify
	gulp.src('js/app.js')
		// run uglify() on it which will minify it
		.pipe(uglify())
		// this is optional but it will put the minified code into a new
		// file called 'app.min.js'
		.pipe(rename('app.min.js'))
		// then put the 'app.min.js' in the 'js' folder.
		.pipe(gulp.dest('dist/js'));
})

// will turn sass into css
gulp.task('compileSass', function() {
	// we just need to get one sass file, because the main
	// one will have all the others imported into it
	gulp.src('sass/global.scss')
		// creating the source maps (I think)
		.pipe(maps.init())
		// compile the sass into css
		.pipe(sass())
		// this means put the source maps in the same folder as the
		// gulp.dest below which will be in 'dist/css'.
		.pipe(maps.write('./'))
		// put it into a folder called 'css' in the 'dist' folder.
		.pipe(gulp.dest('dist/css'));
})

// to run this task, because its 'default' in the console
// we just type 'gulp'. The array ['hello'] means it will
// run the 'gulp.task('hello')' before it runs this 'default'.
gulp.task("default", ["hello"], function() {
	console.log("This is the default task!");
});