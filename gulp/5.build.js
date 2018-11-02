const   gulp = require('gulp'),
        del = require('del'),
				concat = require('gulp-concat');

gulp.task('build:remove', () => {
    return del([`${global.paths.dist}`]);
});

gulp.task('build:build', () => {
  return gulp.src(`${global.paths.app}/**/*`)
             .pipe(gulp.dest(`./dist`));
});

gulp.task('build:clean', () => {
  return del([
              `${global.paths.dist}/modules`,
              `${global.paths.dist}/sass`,
            ]);
});


gulp.task('build', gulp.series('sass','fonts', 'bower', 'js', 'build:remove','build:build', 'build:clean', 'minify'));