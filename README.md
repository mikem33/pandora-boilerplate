# pandora-boilerplate
A HTML5 Boilerplate to start a project.
This package is designed to have a simple development environment in one folder (src) and a result files folder (build) that it will be deployed to production. I am using Stylus for CSS compiling because I think it's the best compiler to work with. The possibility of not use brackets or punctuation in the CSS writing saves a lot of time.

The first thing you have to do to start to work is install Bower dependencies:
```
bower install
```
This will install a jQuery library, a lite version of Modernizr and a version of Normalize.css that it comes in Stylus style.

The next thing to do is install the gulp packages:
```
npm install --save
```

This will install all the necessary stuff to start to work. 
```
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
// notify = require("gulp-notify"),
```

You also can install "gulp-notify" to get notifications when the project compiles or when you make a final build.
Don't forget to uncomment the compiling call to get it working. This is not working on Windows right now.
```
// Compile Stylus CSS
gulp.task('style', function () {
    gulp.src('src/assets/css/styl/main.styl')
        .pipe(stylus({compress: true, use: nib()}))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('src/assets/css'))
        // Uncomment if you have installed this package for notifications.
        //.pipe(notify('CSS Compiled!'))
    ;
});
```



