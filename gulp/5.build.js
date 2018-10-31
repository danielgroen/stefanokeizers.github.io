const   gulp = require('gulp'),
        del = require('del'),
				concat = require('gulp-concat');


// gulp.task('build', gulp.series('sass','fonts', 'js'));
gulp.task('removeDist', () => {
    return del([`${global.paths.dist}`]);
});

gulp.task('buildDist', () => {
  return gulp.src(`${global.paths.app}/**/*`)
             .pipe(gulp.dest(`./dist`));
});

gulp.task('cleanDist', () => {
  return del([
              `${global.paths.dist}/modules`,
              `${global.paths.dist}/sass`,
            ]);

});


gulp.task('build', gulp.series('sass','fonts', 'bower', 'js', 'removeDist','buildDist', 'cleanDist'));