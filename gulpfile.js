// 'use strict' is a javascript thing, not necessary but useful.
'use strict';

const gulp = require('gulp'),
	concat = require('gulp-concat');

// so to run this task, in the console we do 'gulp concatScripts'.
gulp.task('concatScripts', function(){
	// here we gather all of our javascript files.
	// make sure to order them the way you would in an index.html file.
	gulp.src([
		'js/global.js',
		'js/circle/autogrow.js',
		'js/circle/circle.js'])
	// this concats them all into this one file 'app.js'
	// (it will create the file for us)
	.pipe(concat('app.js'))
	// this will put the 'app.js' file in the folder 'js'.
	.pipe(gulp.dest("js"));
});

// to run this task, because its 'default' in the console
// we just type 'gulp'. The array ['hello'] means it will
// run the 'gulp.task('hello')' before it runs this 'default'.
gulp.task("default", ["hello"], function() {
	console.log("This is the default task!");
});