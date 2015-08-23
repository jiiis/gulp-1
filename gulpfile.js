var gulp = require('gulp');

gulp.task('scripts', function() {
    gulp.src('app/js/**/*.js')
        .pipe(gulp.dest('app/jss'));
});

gulp.task('default', ['scripts']);
