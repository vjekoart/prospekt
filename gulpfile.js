'use strict';

const { dest, series, src } = require('gulp');

const concat = require('gulp-concat');
const del = require('del');


function buildCss(cb)
{
    return src('source/stylesheets/**/*.css')
        .pipe(dest('dist'));
}


function buildJs(cb)
{
    const sourceFiles = [
        'source/scripts/capital-m.js',
        'source/scripts/router.js'
    ];

    return src(sourceFiles)
        .pipe(concat('prospekt.js'))
        .pipe(dest('dist'));
}


function clean(cb)
{
    return del('dist/**/*');
}


function cleanExample(cb)
{
    return del('examples/small-company-website/dist/**/*');
}

function updateExample(cb)
{
    return src('dist/**/*')
        .pipe(dest('examples/small-company-website/dist'));
}


exports.default = series(clean, buildCss, buildJs, updateExample);