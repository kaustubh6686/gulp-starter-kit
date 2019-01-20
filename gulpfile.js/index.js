const { src, dest, watch, parallel, series } = require('gulp');
const app = require('./app.config.js');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const exec = require('child_process').exec;
const del = require('del');
const cleancss = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');


const filesToWatch = [
  app.config.html.src,
  app.config.js.dest,
  app.config.css.dest,
];

const postcssProcessors = [
  autoprefixer
];

function compileSass(cb) {
  let filesToProcess = app.config.css.src + '*.sass';
  src(filesToProcess)
  .pipe(sass())
  .pipe(postcss(postcssProcessors))
  .pipe(dest(app.config.css.dest))
  cb();
}

function webpackDev(cb) {
  exec('yarn webpack:dev', function(err, stdout,stderr){
    console.log(stdout);
    console.log(stderr);
    cb(err);
  })
}

function reloadBrowser(cb) {
  browserSync.reload();
  cb();
}

function serveTask(cb) {
  browserSync.init({
    proxy: {
      target: app.server.host,
      target: app.server.port,
    },
    port: 9000,
    open: false,
    online: false,
    files: filesToWatch,
  });
  watch(app.config.css.src, {event:'all'}, compileSass)
  watch(app.config.js.src, {event:'all'}, webpackDev)
  cb();
}
function deleteBuildFolder(cb) {
  return del(app.config.build);
}
function copyToBuildFolder(cb) {
  return src([
    app.config.base + '**/*',
    '!' + app.config.base + '/{scripts,scripts/**}',
    '!' + app.config.base + '/{styles,styles/**}',
  ])
  .pipe(dest(app.config.build))
}
function minifyJs(cb) {
  cb();
}
function minifyCss(cb) {
  let files = app.config.css.dest;
  files = files.replace(app.config.base, app.config.build);
  return src(files + '**/*.css')
  .pipe(cleancss({
    level: {
      2: {}
    }
  }, (details) => {
    console.log(`${details.name}: ${details.stats.originalSize}`);
    console.log(`${details.name}: ${details.stats.minifiedSize}`);
  }))
  .pipe(dest(files));
}
function minifyHtml(cb) {
  return src('./build/**/*.html')
  .pipe(htmlmin({ 
    collapseWhitespace: true,
    removeComments: true,
  }))
  .pipe(dest('./build/'));
}
function webpackProd(cb) {
  exec('yarn webpack:prod', function(err, stdout,stderr){
    console.log(stdout);
    console.log(stderr);
    cb(err);
  })
}

exports.serve = serveTask;
exports.build = series(
  webpackProd,
  deleteBuildFolder,
  copyToBuildFolder,
  parallel(minifyJs, minifyCss, minifyHtml),
);
exports.html = minifyHtml;