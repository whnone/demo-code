const { src, dest, parallel } = require('gulp');
const pug = require('gulp-jade');
const less = require('gulp-scss');
const minifyCSS = require('gulp-csso');
// const concat = require('gulp-concat');

function html() {
  return src('src/pages/*.jade')
    .pipe(pug())
    .pipe(dest('build/wxml'))
}

function css() {
  return src('src/pages/*.scss')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(dest('build/wxss'))
}

function js() {
  return src('src/pages/*.js', { sourcemaps: true })
    .pipe(dest('build/js', { sourcemaps: true }))
}

exports.js = js;
exports.css = css;
exports.html = html;

exports.default = parallel(html, css, js);