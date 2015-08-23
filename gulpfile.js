var gulp = require('gulp'),
    uglify = require('gulp-uglify');

gulp.task('scripts', function() {
    gulp.src('app/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('app/jss'));
});

gulp.task('default', ['scripts']);
