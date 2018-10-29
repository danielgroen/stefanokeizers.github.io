const gulp = require('gulp'),
			sass = require('gulp-sass'),
			sassGlob = require('gulp-sass-glob'),
			gulpAutoprefixer = require('gulp-autoprefixer'),
			plumber = require('gulp-plumber'),
			notify = require('gulp-notify');

gulp.task('sass', () => {
	return gulp.src([`${global.paths.app}/sass/**/*.scss`, `!${global.paths.app}/sass/fonts/*.scss`])
						 .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
						 .pipe(sassGlob())
						 .pipe(sass())
						 .pipe(gulpAutoprefixer())
						 .pipe(gulp.dest(global.paths.app + '/css/'))
						 .pipe(global.browserSync.stream());
});

gulp.task('fonts', () => {
	return gulp.src(`${global.paths.app}/assets/sass/fonts/*.scss`)
						 .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
						 .pipe(sassGlob())
						 .pipe(sass())
						 .pipe(gulpAutoprefixer())
						 .pipe(gulp.dest(global.paths.app + '/css/'))
						 .pipe(global.browserSync.stream());
});