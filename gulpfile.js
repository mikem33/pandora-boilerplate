var del         = require('del'),
    gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    stylus      = require('gulp-stylus'),
    rename      = require("gulp-rename"),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    notify      = require("gulp-notify"),
    cleanCSS    = require('gulp-clean-css'),
    realFavicon = require('gulp-real-favicon'),
    runSequence = require('gulp4-run-sequence');

// Compile Stylus CSS
gulp.task('style', function (done) {
    gulp.src('source/assets/css/compile/styl/style.styl')
        .pipe(stylus({
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

gulp.task('generate-favicon', function(done) {
    // File where the favicon markups are stored (unnecessary but I don't know how to avoid its generation).
    var FAVICON_DATA_FILE = 'source/assets/images/favicons/faviconData.json';
    realFavicon.generateFavicon({
        masterPicture: 'source/assets/images/favicons/favicon-master.png',
        dest: 'source/assets/images/favicons',
        iconsPath: 'source/assets/images/favicons/',
        design: {
            ios: {
                pictureAspect: 'noChange',
                assets: {
                    ios6AndPriorIcons: false,
                    ios7AndLaterIcons: false,
                    precomposedIcons: false,
                    declareOnlyDefaultIcon: true
                }
            },
            desktopBrowser: {},
            windows: {
                pictureAspect: 'noChange',
                backgroundColor: '#2b5797',
                onConflict: 'override',
                assets: {
                    windows80Ie10Tile: false,
                    windows10Ie11EdgeTiles: {
                        small: false,
                        medium: true,
                        big: false,
                        rectangle: false
                    }
                }
            },
            androidChrome: {
                pictureAspect: 'noChange',
                themeColor: '#ffffff',
                manifest: {
                    display: 'standalone',
                    orientation: 'notSet',
                    onConflict: 'override',
                    declared: true
                },
                assets: {
                    legacyIcon: false,
                    lowResolutionIcons: false
                }
            },
            safariPinnedTab: {
                pictureAspect: 'blackAndWhite',
                threshold: 50,
                themeColor: '#5bbad5'
            }
        },
        settings: {
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: false,
            readmeFile: false,
            htmlCodeFile: false,
            usePathAsIs: false
        },
        markupFile: FAVICON_DATA_FILE
    }, function() {
        done();
    });
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
    gulp.src('source/assets/images/*/*')
        .pipe(gulp.dest('build/assets/images/'))
        .pipe(notify('All the resources has been copied to the build folder.'));
    done();
});

gulp.task('build', function(callback) {
    runSequence('cleanBuild','style', 'js', 'copy', callback);
});

// Default gulp task to run 
gulp.task('default', gulp.series('watch'));