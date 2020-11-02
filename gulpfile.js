const { series, parallel, dest } = require('gulp');
const ts = require('gulp-typescript');
const less = require('gulp-less');
const del = require('del');

const tsProject = ts.createProject('tsconfig.json');
// 组件编译目录
const DEST_DIR = './lib';

// 文档编译目录
const DEV_DIR = './.docz';

// less编译配置
const LESS_CONFIG = 'src/**/*.less';

function clean(cb) {
  del(DEST_DIR);
  cb();
}
function cleanDEV(cb) {
  del(DEV_DIR);
  cb();
}
function buildLess(cb) {
  return gulp.src(LESS_CONFIG).pipe(less()).pipe(dest(DEST_DIR));
}
function buildTS(cb) {
  const tsResult = tsProject.src().pipe(tsProject());
  merge([
    tsResult.js.pipe(replace(/\.less/, /\.css/)).pipe(dest(DEST_DIR)),
    tsResult.dts.pipe(replace(/\.less/, /\.css/)).pipe(dest(DEST_DIR)),
  ]);
  cb();
}

exports.build = series(clean, parallel(buildTS, buildLess));
exports.clean = clean;
exports.cleanDEV = cleanDEV;
