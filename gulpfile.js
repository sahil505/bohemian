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