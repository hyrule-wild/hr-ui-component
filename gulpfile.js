const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');
const merge = require('merge2');
const gulpSvgr = require('@proscom/gulp-svgr');
const replace = require('gulp-replace');
const less = require('gulp-less');

const tsProject = ts.createProject('tsconfig.json');

// 组件编译目录
const DEST_DIR = './lib';

// 文档编译目录
const DEV_DIR = './.docz';

// less 目录
const LESS_DIR = {
  src: 'src/**/*.less',
  dest: 'lib/',
};

// svg 文件目录
const SVG_DIR = {
  src: 'src/assets/icon/**/*.svg',
  dest: 'src/components/icon/svg/',
};

// css 目录
const CSS_DIR = ['src/styles/**/*.css'];

// 图片目录
const ASSSETS_DIR = ['src/assets/**/**.svg', 'src/assets/**/**.png', 'src/assets/**/**.jpg'];

// 清理任务
gulp.task('clean', () => del(DEST_DIR));
gulp.task('clean:dev', () => del(DEV_DIR));

// ts 任务
gulp.task('build:ts', () => {
  const tsResult = tsProject.src().pipe(tsProject());
  return merge([
    tsResult.js.pipe(replace(/\.less\'\;/, ".css';")).pipe(gulp.dest(DEST_DIR)),
    tsResult.dts.pipe(replace(/\.less\'\;/, ".css';")).pipe(gulp.dest(DEST_DIR)),
  ]);
});

// less 任务
gulp.task('build:less', () => {
  return gulp.src(LESS_DIR.src).pipe(less()).pipe(gulp.dest(LESS_DIR.dest));
});

/**
 * svg 转换任务
 * @see https://www.npmjs.com/package/@proscom/gulp-svgr
 */
gulp.task('build:svg', () => {
  return gulp
    .src(SVG_DIR.src)
    .pipe(
      gulpSvgr({
        svgr: {
          icon: true,
          plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
          typescript: true,
        },
        extension: 'tsx',
      }),
    )
    .pipe(replace(/(fill|stroke)=\"#[0-9a-zA-Z]{3,6}\"/g, 'fill={props.color}'))
    .pipe(gulp.dest(SVG_DIR.dest));
});

// COPY css 任务
gulp.task('build:css', () => gulp.src(CSS_DIR).pipe(gulp.dest(`${DEST_DIR}/styles`)));
gulp.task('build:img', () => gulp.src(ASSSETS_DIR).pipe(gulp.dest(`${DEST_DIR}/assets`)));

gulp.task('build', gulp.series('clean', 'build:ts', 'build:less', 'build:css', 'build:img'));

gulp.task('watch', () => {
  const watcher = gulp.watch('src/**/*');
  const onWatchChange = gulp.series('build');

  watcher.on('change', onWatchChange);
  watcher.on('add', onWatchChange);
});
