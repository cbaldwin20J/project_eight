// 'use strict' is a javascript thing, not necessary but useful.
'use strict';

const gulp = require('gulp');

// so to run this task, in the console we do 'gulp hello'.
gulp.task('hello', function(){
	console.log("Hello!");
});

// to run this task, because its 'default' in the console
// we just type 'gulp'. The array ['hello'] means it will
// run the 'gulp.task('hello')' before it runs this 'default'.
gulp.task("default", ["hello"], function() {
	console.log("This is the default task!");
});