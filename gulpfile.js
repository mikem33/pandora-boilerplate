var nib         = require('nib'),
    del         = require('del'),
    gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    stylus      = require('gulp-stylus'),
    rename      = require("gulp-rename"),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    notify      = require("gulp-notify"),
    cleanCSS    = require('gulp-clean-css'),
    runSequence = require('gulp4-run-sequence');

// Compile Stylus CSS
gulp.task('style', function (done) {
    gulp.src('source/assets/css/compile/styl/style.styl')
        .pipe(stylus({
            use: nib(),
            'include css': true
        }))
        .pipe(cleanCSS())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('source/assets/css'))
        .pipe(notify('CSS Compiled!'));
    done();
});

// Generate Javascript
gulp.task('js', function(done){
    return gulp.src(['source/assets/javascript/compile/*.js'])
        .pipe(concat('javascript.js'))
        .pipe(gulp.dest('source/assets/javascript'))
        .pipe(notify('JS Compiled!'))
        .pipe(uglify())
        .pipe(gulp.dest('source/assets/javascript'));
    done();
});

// Watch
gulp.task('watch', function() {
    gulp.watch('source/assets/javascript/compile/*.js', gulp.series('js'));
    gulp.watch('source/assets/css/compile/styl/*.styl', gulp.series('style'));
});

gulp.task('cleanBuild', function () {
    return del('build');
});

gulp.task('copy', function(done) {
    gulp.src('source/*.html')
        .pipe(gulp.dest('build/'))
    gulp.src('source/assets/css/style.css')
        .pipe(gulp.dest('build/assets/css/'))
    gulp.src('source/assets/javascript/*.js')
        .pipe(gulp.dest('build/assets/javascript/'))
    gulp.src('source/assets/images/*')
        .pipe(gulp.dest('build/assets/images/'))
        .pipe(notify('All the resources has been copied to the build folder.'));
    done();
});

gulp.task('build', function(callback) {
    runSequence('cleanBuild','style', 'js', 'copy', callback);
});

// Default gulp task to run 
gulp.task('default', gulp.series('watch'));