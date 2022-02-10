/**
 * src 读
 * dest 写
 * parallel 同步
 * series 异步
 * 
 */
const {src, dest, parallel, series} = require('gulp')
const guleClear = require('gulp-clean')


function clearBev () {
    return src('dist/**', {read: 'false'}).pipe(guleClear())
}

function copyJsBev () {
    return src('src/**/*.js', {base: 'src'}).pipe(dest('dist'))
}

function copyHtmlBev () {
    return src('src/**/*.wxml', {base: 'src'}).pipe(dest('dist'))
}

const compile = series(clearBev, copyJsBev, copyHtmlBev)

exports.compile = compile