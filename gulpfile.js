var nib         = require('nib'),
    del         = require('del'),
    gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    stylus      = require('gulp-stylus'),
    rename      = require("gulp-rename"),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    critical    = require('critical').stream,
    runSequence = require('run-sequence').use(gulp);
    notify = require("gulp-notify"),

// Compile Stylus CSS
gulp.task('style', function () {
    gulp.src('src/assets/css/styl/main.styl')
        .pipe(stylus({compress: true, use: nib()}))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('src/assets/css'))
        .pipe(notify('CSS Compiled!'))
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

// Generate & Inline Critical-path CSS
gulp.task('critical', function () {
    return gulp.src('src/*.html')
        .pipe(critical({
            base: 'src/', 
            inline: true,
            dest: '/build',
            css: ['src/assets/css/style.css'],
            width: 1300,
            height: 900,
            minify: true,
            pathPrefix: '/'
        }))
        .on('error', function(err) { gutil.log(gutil.colors.red(err.message)); })
        .pipe(gulp.dest('build'));
});

gulp.task('cleanBuild', function () {
    return del('build');
});

gulp.task('copy', function() {
    gulp.src('src/assets/css/style.css')
        .pipe(gulp.dest('build/assets/css/'))
    gulp.src('src/assets/js/javascript.js')
        .pipe(gulp.dest('build/assets/js/'))
    gulp.src('bower_components/picturefill/dist/picturefill.min.js')
        .pipe(gulp.dest('build/assets/js/'))
    gulp.src('src/assets/img/*')
        .pipe(gulp.dest('build/assets/img/'))
});

gulp.task('build', function(callback) {
    runSequence('style', 'js', 'critical', 'copy', callback);    
});

// Default gulp task to run 
gulp.task('default', ['watch']);