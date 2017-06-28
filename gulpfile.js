var gulp        = require('gulp'),
    stylus      = require('gulp-stylus'),
    nib         = require('nib'),
    watch       = require('gulp-watch'),
    rename      = require("gulp-rename"),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    del         = require('del'),
    runSequence = require('run-sequence').use(gulp);
    // If you want to be notified when a compiling is done, you can install this package.
    // Only working on macOS at the moment.
    // notify = require("gulp-notify"),

// Compile Stylus CSS
gulp.task('style', function () {
    gulp.src('src/assets/css/styl/main.styl')
        .pipe(stylus({compress: true, use: nib()}))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('src/assets/css'))
        // Uncomment this if you have installed this package for notifications.
        //.pipe(notify('CSS Compiled!'))
    ;
});

// Watch
gulp.task('watch', function() {
    gulp.watch('src/assets/js/main.js', ['js']);
    gulp.watch('src/assets/css/styl/*.styl', ['style']);
});

// Generate Javascript
gulp.task('js', function(){
    return gulp.src(['bower_components/jquery/dist/jquery.min.js','bower_components/modernizr/modernizr.custom.js','src/assets/js/libraries/*.js'])
        .pipe(concat('javascript.js'))
        .pipe(gulp.dest('src/assets/js'))        
        .pipe(uglify())
        .pipe(gulp.dest('src/assets/js'));
});

gulp.task('cleanBuild', function () {
    return del('build');
});

gulp.task('copy', function() {
    gulp.src('src/assets/css/style.css')
        .pipe(gulp.dest('build/assets/css/'))
    gulp.src('src/assets/js/javascript.js')
        .pipe(gulp.dest('build/assets/js/'))
    gulp.src('src/assets/img/*')
        .pipe(gulp.dest('build/assets/img/'))
    gulp.src('src/*.html')
        .pipe(gulp.dest('build/'));
});

gulp.task('build', function(callback) {
    runSequence('style', 'js', 'copy', callback);    
});

// Default gulp task to run 
gulp.task('default', ['watch']);