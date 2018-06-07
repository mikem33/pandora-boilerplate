# pandora-boilerplate
A **HTML5 Boilerplate** to start a project.
This package is designed to have a **simple development environment** in one folder (src) and a **result files folder** (build) that it will be deployed to production. I am using [Stylus](http://stylus-lang.com) for preprocessing _CSS_.

The first thing you have to do to start to work is install _NPM_ dependencies:
```
npm install --save
```
This will install all the necessary stuff to start to work. 
```javascript
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
```

> The module [gulp-notify](https://github.com/mikaelbr/gulp-notify) is totally optional. I found it very useful to get notifications when I'm developing a project.
> If you are using Windows this module is not working right now. I have to resolve this issue.

Also it will instal a _jQuery_ library, a customized lite version of _Modernizr_, the reset _Normalize.css_ and the _PictureFill_ library to deal with responsive images.

## Developing
When we have made all the previous setup we have to start to work in the "source" folder.

The tasks that you can use for developing your project are basically **CSS compiling and javascript files concatenation**. We have to use `gulp watch` for watch changes in the files that we are working on. This watch task it will watch if there are any changes in all the `.styl` files in the _CSS_ folder and the changes in the file `main.js`. I you want to add more _javascript_ files feel free to add to the corresponding task.

When a change is detected in these files the compiling task (in the case of _CSS_) or the concatenation task (in the case of _JS_) it will be launched.

```javascript
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
    gulp.watch('src/assets/css/compile/styl/*.styl', ['style']);
});
```
> Also we have a task for putting inline all the critical _CSS_ styles and _javascript_ to improve the loading performance. This task could be used as a solo task but I recommend using it when we finish the project because it generates _HTML_ files for production purposes.

When we finish our work, we will use `gulp build` to generate the final project that we are using as production site. This task will copy to the `build` folder all the necessary files to deploy the project.