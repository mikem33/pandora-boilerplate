var nib         = require('nib'),
    del         = require('del'),
    gulp        = require('gulp'),
    log         = require('fancy-log'),
    watch       = require('gulp-watch'),
    stylus      = require('gulp-stylus'),
    rename      = require("gulp-rename"),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    notify      = require("gulp-notify"),
    cleanCSS    = require('gulp-clean-css'),
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
        .pipe(notify('The initialization of the project has been succesful! (PictureFill/jQuery/Normalize) copied to its folders.'))
});

gulp.task('modernizr', function() {
    return gulp.src('src/assets/js/compile/*.js')
        .pipe(modernizr(require('./modernizr.json')))
        .pipe(gulp.dest('src/assets/js/compile/vendor'))
        .pipe(notify('Modernizr has been generated.'))
});

// Compile Stylus CSS
gulp.task('style', function () {
    gulp.src('src/assets/css/compile/styl/main.styl')
        .pipe(stylus({
            use: nib(),
            'include css': true
        }))
        .pipe(cleanCSS())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('src/assets/css'))
        .pipe(notify('CSS Compiled!'))
    ;
});

// Generate Javascript
gulp.task('js', function(){
    return gulp.src(['src/assets/js/compile/vendor/jquery.js','src/assets/js/compile/vendor/*.js','src/assets/js/compile/*.js'])
        .pipe(concat('javascript.js'))
        .pipe(gulp.dest('src/assets/js'))
        .pipe(notify('JS Compiled!'))
        .pipe(uglify())
        .pipe(gulp.dest('src/assets/js'));
});

// Watch
gulp.task('watch', function() {
    gulp.watch('src/assets/js/compile/*.js', ['js']);
    gulp.watch('src/assets/css/compile/styl/*.styl', ['style']);
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
        .on('error', function(err) { log.error(err.message); })
        .pipe(notify('Critical has inlined the corresponding CSS and JS to the HTML document.'))
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
        .pipe(notify('All the resources has been copied to the build folder.'))
});

gulp.task('build', function(callback) {
    runSequence('style', 'js', 'copy', 'critical', callback);
});

// Default gulp task to run 
gulp.task('default', ['watch']);