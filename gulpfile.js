'use strict';
const 			gulp 				= require('gulp'),
				browserSync 		= require('browser-sync').create(),
				mainBowerFiles		= require('main-bower-files'),
				gulpAutoprefixer 	= require('gulp-autoprefixer'),
				concat 				= require('gulp-concat'),
				notify 				= require('gulp-notify'),
				plumber 			= require('gulp-plumber'),
				sass 				= require('gulp-sass'),
				deploy				= require('gulp-gh-pages'),
				sassGlob 			= require('gulp-sass-glob'),
				uglify 				= require('gulp-uglify'),
				filesystem			= require('fs'),
				replace 			= require('gulp-replace'),
				cssnano 			= require('gulp-cssnano'),
				htmlmin				= require('gulp-htmlmin'),
				styleInject 		= require("gulp-style-inject"),
				imagemin 			= require('gulp-imagemin'),
				async 				= require('async'),
				mozjpeg 			= require('imagemin-mozjpeg'),
				reload 				= browserSync.reload,
				
				// files
				app 				= './app',
				dist 				= 'dist',
				jsFiles 			= '/js/source/*.js',
				data	 			= '/data/*.json',
				images 				= '/img/**/*.{png,jpg,jpeg,ico}',
				sassFiles 			= '/sass/**/*.scss',
				htmlFiles 			= '/*.html',
				cssFiles 			= '/css/*.css',
				cname				= '/CNAME',

				options = {
					remoteUrl: "https://github.com/danielgroen/stefanokeizers.github.io.git",
					branch: "master",
					force: true
				};

// Setup browsersync.
gulp.task('browsersync', function() {
    browserSync.init({
        server: {
            baseDir: app
        },
        ghostMode: false
    });
});

// set scss files to the css folder into a css file
gulp.task('css',function() {
	return gulp.src(app + sassFiles)
    	.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sassGlob())
	    .pipe(sass())
		.pipe(gulpAutoprefixer({
	        browsers: ['last 20 versions'],
        	cascade: false
		}))
		.pipe(gulp.dest(app + '/css/'))
		.pipe(browserSync.stream());


});

gulp.task('js', function() {
	return gulp.src(mainBowerFiles(['**/*.js']).concat(app + jsFiles))
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(concat('main.js'))
		.pipe(gulp.dest(app + '/js/'))
		.pipe(browserSync.stream());
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
gulp.task('serve', ['browsersync'], function() {
	gulp.watch([app + htmlFiles]).on("change", reload);
	gulp.watch([app + jsFiles], ['js']);
	gulp.watch([app + data]).on("change", reload);
	gulp.watch([app + sassFiles], ['css']);	
});

gulp.task('default', ['serve']);

gulp.task('build', ['js'], function() {

	async.series([
	    function (next) {
			gulp.src(app + cssFiles)	
				.pipe(cssnano())
				.pipe(gulp.dest( dist + '/css/'))
				.on('end', next);
		},
	    function (next) {
			gulp.src(app + htmlFiles)
				.pipe(styleInject({encapsulated: false}))
			    .pipe(replace('<link type="text/css" rel="stylesheet" type="text/css" href="css/stylesheet.css">', ' '))
			    .pipe(replace('<style><!-- inject-style src="./dist/css/stylesheet.css" --></style>', ' '))
				.pipe(htmlmin({collapseWhitespace: true}))
				.pipe(gulp.dest(dist));
	    }]
    );

	gulp.src(app + '/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest( dist + '/js/'));


	gulp.src(app + data)
		.pipe(gulp.dest( dist + '/data/'));

	gulp.src(app + images)
		.pipe(imagemin([mozjpeg()]))
		.pipe(gulp.dest(dist + '/img/'));

});

gulp.task('deploy', function() {
	gulp.src(["dist/**/*.*", "dist/CNAME"])
		.pipe(deploy(options));
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////