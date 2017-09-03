'use strict';
const 	gulp 							= require('gulp'),
				browserSync 			= require('browser-sync').create(),
				mainBowerFiles		= require('main-bower-files'),
				gulpAutoprefixer 	= require('gulp-autoprefixer'),
				concat 				= require('gulp-concat'),
				inlineCss 			= require('gulp-inline-css'),
				notify 				= require('gulp-notify'),
				plumber 			= require('gulp-plumber'),
				sass 					= require('gulp-sass'),
				ghpages				= require('gulp-gh-pages'),
				sassGlob 			= require('gulp-sass-glob'),
				uglify        = require('gulp-uglify'),
				filesystem		= require('fs'),
				htmlmin				= require('gulp-htmlmin'),
				imagemin 			= require('gulp-imagemin'),
				mozjpeg 			= require('imagemin-mozjpeg'),
				// files
				app 				= './app',
				dist 				= 'dist',
				jsFiles 			= app + '/js/**/*.js',
				images 				= app + '/img/**/*.{png,jpg,jpeg}',
				sassFiles 			= app + '/sass/**/*.scss',
				htmlFiles 			= app + '/*.html',
				cname				= app + '/CNAME',

				options = {
					remoteUrl: "https://github.com/danielgroen/stefanokeizers.github.io.git",
					branch: "master",
					force: true
				};

// Setup browsersync.
gulp.task('browsersync', function() {
    filesystem.readFile('environment', 'utf8', function (error, environment) {
        browserSync.init({
            proxy: environment
        });
    });
});

// set scss files to the css folder into a css file
gulp.task('sass-serve',function() {
	gulp.src(sassFiles)
    	.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sassGlob())
	    .pipe(sass())
		.pipe(gulpAutoprefixer())
		.pipe(concat('stylesheet.css'))
		.pipe(gulp.dest(app+'/css/'))
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
    	.pipe(inlineCss())
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(dist))
		.pipe(browserSync.stream());

	gulp.src(cname)
    	.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    	.pipe(gulp.dest(dist));
});

gulp.task('compile', function() {
	return	gulp.src(images)
    	.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(imagemin([mozjpeg()]))
		.pipe(gulp.dest(dist + '/img/'));
});

gulp.task('serve', ['browsersync'], function(){
    gulp.watch(sassFiles, ['sass-serve']);
	gulp.watch(jsFiles, ['js']);
	gulp.watch(htmlFiles, ['html']);
	gulp.watch(images, ['compile']);
});


/////////////////////////////////////////////////
/////////////////////////////////////////////////
gulp.task('build', ['sass-serve', 'html','js', 'compile']);
gulp.task('default', ['serve']);
/////////////////////////////////////////////////
/////////////////////////////////////////////////

//deploy the dist folder to gh pages
gulp.task('deploy', ['build'], function () {
	return del('./.publish/', {force:true});
	gulp.src(["dist/**/*.*", "dist/CNAME"])
		.pipe(ghpages(options));
});