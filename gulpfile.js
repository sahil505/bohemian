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
