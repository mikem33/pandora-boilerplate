var nib         = require('nib'),
    del         = require('del'),
    gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    stylus      = require('gulp-stylus'),
    rename      = require("gulp-rename"),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    notify      = require("gulp-notify"),
    modernizr   = require('gulp-modernizr'),
    critical    = require('critical').stream,
    runSequence = require('run-sequence').use(gulp);

// The Init task it's for copy the javascript dependencies to the src folder.
gulp.task('init', ['modernizr'], function() {
    gulp.src('node_modules/picturefill/dist/picturefill.min.js')
        .pipe(gulp.dest('src/assets/js'))
    gulp.src('node_modules/jquery/dist/jquery.js')
        .pipe(gulp.dest('src/assets/js/compile/vendor'))
    gulp.src('node_modules/normalize.css/normalize.css')
        .pipe(gulp.dest('src/assets/css/compile/vendor'))
});

gulp.task('modernizr', function() {
    return gulp.src('src/assets/js/compile/*.js')
        .pipe(modernizr(require('./modernizr.json')))
        .pipe(gulp.dest('src/assets/js/compile/vendor'))
});

// Compile Stylus CSS
gulp.task('style', function () {
    gulp.src('src/assets/css/styl/main.styl')
        .pipe(stylus({
            compress: true, 
            use: nib(),
            'include css': true
        }))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('src/assets/css'))
        .pipe(notify('CSS Compiled!'))
    ;
});

gulp.task('styles', function () {
    gulp.src('wp-content/themes/vithas-indentia/assets/css/styl/main.styl')
        .pipe(stylus({ compress: false, use: nib(), 'include css': true}))
        .on('error', swallowError)
        .pipe(rename('style.css'))
        .pipe(gulp.dest('wp-content/themes/vithas-indentia/'))        
    ;
});

// Generate Javascript
gulp.task('js', function(){
    return gulp.src(['src/assets/js/compile/vendor/jquery.js','src/assets/js/compile/vendor/*.js','src/assets/js/compile/*.js'])
        .pipe(concat('javascript.js'))
        .pipe(gulp.dest('src/assets/js'))        
        .pipe(uglify())
        .pipe(gulp.dest('src/assets/js'));
});

// Watch
gulp.task('watch', function() {
    gulp.watch('src/assets/js/compile/*.js', ['js']);
    gulp.watch('src/assets/css/styl/*.styl', ['style']);
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
    gulp.src('src/assets/js/*.js')
        .pipe(gulp.dest('build/assets/js/'))    
    gulp.src('src/assets/img/*')
        .pipe(gulp.dest('build/assets/img/'))
});

gulp.task('build', function(callback) {
    runSequence('style', 'js', 'critical', 'copy', callback);
});

// Default gulp task to run 
gulp.task('default', ['watch']);