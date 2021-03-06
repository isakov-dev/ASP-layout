let gulp = require('gulp'),
    sass = require('gulp-sass'),
    gcmq = require('gulp-group-css-media-queries'),
    fileinclude = require('gulp-file-include'),
    htmlbeautify = require('gulp-html-beautify');

let path = {
    build: {
        css: 'css/',
        html: './',
    },
    src: {
        css: 'src/scss/style.scss',
        html: 'src/html/*.html',
    },
    watch: {
        css: 'src/scss/**/*.scss',
        html: 'src/html/**/*.html',
        data: 'data/**/*.json',
    }
};

function styles() {
    return gulp.src(path.src.css)
        .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
        .pipe(gcmq())
        .pipe(gulp.dest(path.build.css))
}

function html() {
    return gulp.src(path.src.html)
        .pipe(fileinclude())
        .pipe(htmlbeautify({indentSize: 4}))
        .pipe(gulp.dest(path.build.html));
}

function watch() {
    gulp.watch(path.watch.css, styles)
    gulp.watch(path.watch.html, html)
    //gulp.watch(path.watch.data, html)
}

exports.default = gulp.parallel(html, styles, watch);