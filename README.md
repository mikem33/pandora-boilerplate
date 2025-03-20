# pandora-boilerplate
A **HTML5 Boilerplate** to start a project.
This package is designed to have a **simple development environment** in one folder (source) and a **result files folder** (build) that contains all the project files ready to be deployed. I am using [Stylus](http://stylus-lang.com) for preprocessing _CSS_.

The first thing you have to do to start to work is install _NPM_ dependencies:
```
npm install --save
```
This will install all the necessary stuff to start to work. 
```javascript
const del = require('del'),
      gulp = require('gulp'),
      watch = require('gulp-watch'),
      stylus = require('gulp-stylus'),
      rename = require("gulp-rename"),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      notify = require("gulp-notify");
```

> The module [gulp-notify](https://github.com/mikaelbr/gulp-notify) is totally optional. I found it very useful to get notifications when I'm developing a project.

## Developing
When we finish the previous setup we can start our work in the "source" folder.

The tasks you can use for developing your project are basically **CSS compiling and javascript files concatenation**. We have to use the command `gulp watch` for watch changes in the files that we are working on. This task will watch if there are any changes in any of the `.styl` files in the _CSS_ folder and also the changes in any of the custom javascript files.

When a change is detected in these files the compiling task (in the case of _CSS_) or the concatenation task (in the case of _JS_) will be launched.

```javascript
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
```

When we finish our work, we will use `gulp build` to generate the final project that we are using as production site. This task will copy to the `build` folder all the necessary files to deploy the project.