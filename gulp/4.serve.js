const   gulp = require('gulp'),
        reload = global.browserSync.reload;

gulp.task('watch', () => {
    browserSync.init({
        server: {
            baseDir: `${global.paths.app}`,
            serveStaticOptions: {
              extensions: ["html"]
          }
        },
        ghostMode: false
    });

    gulp.watch(`${global.paths.app}/*.html`).on('change', reload);
    gulp.watch(`${global.paths.app}/modules/**/*.js`, gulp.series('js'));
    gulp.watch([`!${global.paths.app}/sass/fonts/*.scss`, `${global.paths.app}/**/*.scss`], gulp.series('sass'));
    gulp.watch([`${global.paths.app}/sass/fonts/*.scss`], gulp.series('fonts'));
});

gulp.task('serve', gulp.series('sass','fonts', 'js', 'watch'));
