var gulp = require('gulp');

gulp.task('scripts', function(cb) {
    setTimeout(function() {
        console.log('Task "scripts" is finished.');
        cb();
    }, 1000);
});

gulp.task('default', ['scripts']);
