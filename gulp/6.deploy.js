const gulp = require('gulp'),
      ghPages = require('gulp-gh-pages');

gulp.task('deployment', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages(global.ghpagesOptions));
});

gulp.task('deploy', gulp.series('build', 'deployment'));
