'use strict';
const 	gulp 				= require('gulp'),
		browserSync 		= require('browser-sync').create(),
		mainBowerFiles		= require('main-bower-files'),
		gulpAutoprefixer 	= require('gulp-autoprefixer'),
		concat 				= require('gulp-concat'),
		notify 				= require('gulp-notify'),
		plumber 			= require('gulp-plumber'),
		sass 				= require('gulp-sass'),
		sassGlob 			= require('gulp-sass-glob'),
      	uglify        		= require('gulp-uglify'),
		gulpMin 			= require('gulp-min'),
		wiredep				= require('wiredep').stream,
		filesystem			= require('fs'),
		htmlmin				= require('gulp-htmlmin'),
		imagemin 			= require('gulp-imagemin'),

		// files
		app 				= './app',
		dist 				= 'dist',
		jsFiles 			= app + '/js/**/*.js',
		images 				= app + '/**/*.{png,jpg,jpeg}',
		sassFiles 			= app + '/sass/**/*.scss',
		htmlFiles 			= app + '/html/*.html';

// Setup browsersync.
gulp.task('browsersync', function() {
    filesystem.readFile('environment', 'utf8', function (error, environment) {
        browserSync.init({
            proxy: environment
        });
    });
});

// inject bower components
gulp.task('wiredep', function () {
    gulp.src(sassFiles)
		.pipe(sassGlob())
        .pipe(plumber())
		.pipe(wiredep())
		.pipe(gulpAutoprefixer())
		.pipe(gulp.dest('app/sass'));
});

// set scss files to the css folder into a css file
gulp.task('sass-serve',function() {
	gulp.src(sassFiles)
    	.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sassGlob())
	    .pipe(sass({}))
		.pipe(gulpAutoprefixer())
		.pipe(concat('stylesheet.css'))
		.pipe(gulp.dest(dist+'/css/'))
		.pipe(browserSync.stream());
});

//task gejat van manofhthematches
gulp.task('js', function() {
	gulp.src(mainBowerFiles(['**/*.js']).concat(jsFiles))
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sassGlob())
		.pipe(uglify())
		.pipe(concat('main.js'))
		.pipe(gulp.dest(dist+'/js/'))
		.pipe(browserSync.stream());
});

gulp.task('html',function() {
	gulp.src(htmlFiles)
    	.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(dist))
		.pipe(browserSync.stream());
});

gulp.task('compile', function() {
	gulp.src(images)
    	.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(imagemin())
		.pipe(gulp.dest(dist + '/img/'));
});

gulp.task('serve', ['browsersync'], function(){
    gulp.watch('bower.json', ['wiredep']);
    gulp.watch(sassFiles, ['sass-serve']);
	gulp.watch(jsFiles, ['js']);
	gulp.watch(htmlFiles, ['html']);
	gulp.watch(images, ['compile']);
});


/////////////////////////////////////////////////
/////////////////////////////////////////////////
gulp.task('build', ['html','js', 'sass-serve', 'wiredep', 'compile']);
gulp.task('default', ['serve']);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
