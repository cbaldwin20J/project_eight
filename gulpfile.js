// 'use strict' is a javascript thing, not necessary but useful.
'use strict';

const gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	maps = require('gulp-sourcemaps'),
	uglifycss = require('gulp-uglifycss'),
	del = require('del'),
	imagemin = require('gulp-imagemin');

// so to run this task, in the console we do 'gulp concatScripts'.
gulp.task('concatScripts', function(){
	// here we gather all of our javascript files.
	// make sure to order them the way you would in an index.html file.
	//*** since this is a dependency of 'minifyScripts' we put 'return' to 
	//*** make sure this finishes first.
	return gulp.src([
		'js/global.js',
		'js/circle/autogrow.js',
		'js/circle/circle.js'])
	// this will create our source maps
	.pipe(maps.init())
	// this concats them all into this one file 'app.js'
	// (it will create the file for us)
	.pipe(concat('all.js'))
	// this will put the source maps in the same folder
	// as the gulp.dest below which is 'dist/js'
	.pipe(maps.write('./'))
	// this will put the 'app.js' file in the folder 'js'.
	.pipe(gulp.dest("dist/scripts"));
});

// call 'gulp minifyScripts' to run this. Its important this goes
// after the 'concatScripts' above.
gulp.task('minifyScripts', ["concatScripts"], function(){
	// get the file you want to minify
	gulp.src('dist/scripts/all.js')
		// run uglify() on it which will minify it
		.pipe(uglify())
		// this is optional but it will put the minified code into a new
		// file called 'app.min.js'
		.pipe(rename('all.min.js'))
		// then put the 'app.min.js' in the 'js' folder.
		.pipe(gulp.dest('dist/scripts'));
})

// will turn sass into css and concat it into one file.
gulp.task('compileSass', function() {
	// we just need to get one sass file, because the main
	// one will have all the others imported into it
	return gulp.src('sass/global.scss')
		// creating the source maps (I think)
		.pipe(maps.init())
		// compile the sass into css
		.pipe(sass())
		.pipe(rename('all.css'))
		// this means put the source maps in the same folder as the
		// gulp.dest below which will be in 'dist/css'.
		.pipe(maps.write('./'))
		// put it into a folder called 'css' in the 'dist' folder.
		.pipe(gulp.dest('dist/styles'));
})

// will minify our new concated css file.
gulp.task('minifyCss', ['compileSass'], function(){
	// get the file you want to minify
	gulp.src('dist/styles/all.css')
		// run uglify() on it which will minify it
		.pipe(uglifycss())
		.pipe(rename('all.min.css'))
		// then put the 'app.min.js' in the 'js' folder.
		.pipe(gulp.dest('dist/styles'));
})


gulp.task("scripts", ["minifyScripts"]);

gulp.task("styles", ["minifyCss"]);

gulp.task('images', () =>
    gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/content'))
);

gulp.task('clean', function(){
	del.sync('dist');
});

gulp.task('build', ['clean', 'scripts', 'styles', 'images']);

// this will delete the 'dist' folder and everything inside.


// when run, will watch if any of the sass files are changed,
// if one is then it will call the 'styles' task.
gulp.task('watch', function(){
	gulp.watch('sass/**/**/*.sass', ['styles']);
});


// to run this task, because its 'default' in the console
// we just type 'gulp'. The array ['clean'] means it will
// run the 'gulp.task('clean')' before it runs the callback 
// function of 'gulp.start('build').
gulp.task("default", ["build"], function() {
	gulp.start('build');
});