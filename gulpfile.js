var gulp        = require('gulp'),
    stylus      = require('gulp-stylus'),
    nib         = require('nib'),
    watch       = require('gulp-watch'),
    rename      = require("gulp-rename"),
    notify      = require("gulp-notify"),
    minify      = require('gulp-minify-css'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify');

// Compile Stylus CSS
gulp.task('style', function () {
    gulp.src('src/assets/css/styl/main.styl')
        .pipe(stylus({use: nib()}))
        .pipe(rename('style.css'))
        .pipe(minify({compatibility: 'ie8'}))
        .pipe(gulp.dest('src/assets/css'))
        .pipe(notify('CSS Compiled!'))
    ;
});

// Watch
gulp.task('watch-css', function() {
    gulp.watch('src/assets/css/styl/*.styl', ['style']);
});

gulp.task('watch-js', function() {
    gulp.watch('src/assets/js/main.js', ['js']);
});

// Generate Javascript
gulp.task('js', function(){
    return gulp.src(['bower_components/jquery/dist/jquery.min.js','bower_components/modernizr-lite/modernizr.js','main.js'])
        .pipe(concat('javascript.js'))
        .pipe(gulp.dest('src/assets/js'))        
        .pipe(uglify())
        .pipe(gulp.dest('src/assets/js'));
});

// Default gulp task to run 
gulp.task('default', ['watch']);