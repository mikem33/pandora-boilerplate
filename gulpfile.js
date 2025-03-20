const del = require('del'),
    gulp = require('gulp'),
    watch = require('gulp-watch'),
    stylus = require('gulp-stylus'),
    rename = require("gulp-rename"),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    notify = require("gulp-notify");

// Compile Stylus CSS
gulp.task('style', function () {
    return gulp.src('source/assets/css/compile/styl/style.styl')
        .pipe(stylus({
            compress: true,
            'include css': true
        }))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('source/assets/css'))
        .pipe(notify({ message: 'CSS Compiled!', onLast: true }));
});

// Generate Javascript
gulp.task('js', function () {
    return gulp.src(['source/assets/javascript/compile/*.js'])
        .pipe(concat('javascript.js'))
        .pipe(gulp.dest('source/assets/javascript'))
        .pipe(uglify())
        .pipe(gulp.dest('source/assets/javascript'))
        .pipe(notify({ message: 'JS Compiled!', onLast: true }));
});

// Watch
gulp.task('watch', function () {
    gulp.watch('source/assets/javascript/compile/**/*.js', gulp.series('js'));
    gulp.watch('source/assets/css/compile/styl/**/*.styl', gulp.series('style'));
});

// Delete Build Folder
gulp.task('cleanBuild', function () {
    return del('build');
});

// Copy files to Build Folder
gulp.task('copy', function () {
    return gulp.src([
        'source/**/*.html',
        'source/assets/css/style.css',
        'source/assets/javascript/**/*.js',
        '!source/assets/javascript/compile/**',
        'source/assets/images/**/*'
    ], { base: 'source' })
        .pipe(gulp.dest('build'))
        .pipe(notify({ message: 'All resources have been copied to the build folder.', onLast: true }));
});

// Build Task
gulp.task('build', gulp.series(
    'cleanBuild',
    gulp.parallel('style', 'js'),
    'copy'
));

// Default task
gulp.task('default', gulp.series('watch'));
