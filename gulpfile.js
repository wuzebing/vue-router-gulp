var gulp = require('gulp'),
    // cached = require('gulp-cached'),
    // del = require('del'),
    path = require('path'),
    // watch = require('gulp-watch'),
    // jshint = require('gulp-jshint'),
    // webpack = require('gulp-webpack'),
    // beautify = require('gulp-beautify'),
    // spritesmith = require('gulp.spritesmith'),
    // gutil = require('gulp-util'), // debug tasks
    // rev = require('gulp-rev'), // version control
    // revReplace = require('gulp-rev-replace');
    connect = require('gulp-connect');



var config = {
    base: './', // 当前文件所在目录
    src: './resources/', // 所有开发资源目录
    dist: './dist/', // 开发环境生成的静态资源--dev版本
    html: './views/',
    splitting: './src/splitting/' // 静态资源版本号map
};

// 合成雪碧图
var spriteImgConfig = {
    src: {
        baby: ['./src/sprite/baby.jpg', './src/sprite/baby2.jpg'],
        ss: ['./src/sprite/avatar.jpg', './src/sprite/captain.jpg']
    },
    dist: path.resolve(__dirname, config.splitting, 'sprite'),
    option: { // [spritesmith的配置选项](https://github.com/twolfson/gulp.spritesmith)

    }
};


gulp.task('connect', function() {
  connect.server({
      root: ['views', './', 'json', 'resources'],
      port: 8883,
      host: 'localhost',
      livereload: true
  });
});
