var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    compass = require('gulp-compass'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    del = require('del'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('html', function() {
    gulp.src('app/**/*.html')
        .pipe(plumber())
        .pipe(reload({
            stream: true
        }));
});

gulp.task('css', function() {
    gulp.src('app/scss/style.scss')
        .pipe(plumber())
        .pipe(compass({
            config_file: './config.rb',
            css: 'app/css',
            sass: 'app/scss',
            require: ['susy', 'breakpoint']
        }))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('app/css'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('js', function() {
    gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
        .pipe(plumber())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app/'
        }
    });
});

gulp.task('build:remove', function(cb) {
    del('build', cb);
});

gulp.task('build:copy', ['build:remove'], function() {
    return gulp.src('app/**/*')
        .pipe(gulp.dest('build/'));
});

gulp.task('build:clear', ['build:copy'], function() {
    del([
        'build/scss',
        'build/js/!(*.min.js)'
    ]);
});

gulp.task('build', ['build:clear']);

gulp.task('build:serve', function() {
    browserSync({
        server: {
            baseDir: 'build/'
        }
    });
});

gulp.task('watch', function() {
    gulp.watch('app/**/*.html', ['html']);
    gulp.watch('app/js/**/*.js', ['js']);
    gulp.watch('app/scss/**/*.scss', ['css']);
});

gulp.task('default', ['html', 'js', 'css', 'browser-sync', 'watch']);
