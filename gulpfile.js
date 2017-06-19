'use strict';

var del = require('del');
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');
var postcss = require('gulp-postcss');
var sorting = require('postcss-sorting');

// Config
var build = {
  css: './assets/css',
	scss: './src/scss/'
};

var AUTOPREFIXER_BROWSERS = [
  'ie >= 11',
  'edge >= 12',
  'ff >= 38',
  'chrome >= 35',
  'safari >= 8',
  'opera >= 35',
  'ios >= 8'
];

gulp.task('css', function () {
  var css = gulp
  .src(build.scss + '*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({
    indentType: 'tab',
    indemtWidth: 1,
    outputStyle: 'expanded',
    precision: 10,
    onError: console.error.bind(console, 'Sass error:')
  }))
  .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
  .pipe(
    postcss([
      sorting(sortOrder),
      torem({
        rootValue: 16,
        unitPrecision: 7,
        propWhiteList: [
          'font',
          'font-size',
          'margin',
          'margin-left',
          'margin-right',
          'margin-top',
          'margin-bottom',
          'padding',
          'padding-left',
          'padding-right',
          'padding-top',
          'padding-bottom'],
        selectorBlackList: [],
        replace: true,
        mediaQuery: false,
        minPixelValue: 0
      })
    ])
  )
})