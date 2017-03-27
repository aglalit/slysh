const gulp = require('gulp');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const bower = require('gulp-bower');
const del = require('del');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');
const changed = require('gulp-changed');
const livereload = require('gulp-livereload');
const nodemon = require('gulp-nodemon');
const stylelint = require('gulp-stylelint');


gulp.task('scss', () => {
  return gulp.src('./src/css/*.scss')
 .pipe(changed('public/css'))
 .pipe(sass())
 .pipe(autoprefixer({
           browsers: ['last 2 versions'],
           cascade: false
       }))
 .pipe(stylelint({
      failAfterError: false,
      reporters: [
        {formatter: 'string', console: true}
           ]
         }))
 .pipe(gulp.dest('./public/css'))
 .pipe(livereload())
});

gulp.task('scssbuild', () => {
  return gulp.src('./src/css/*.scss')
  .pipe(stylelint({
            failAfterError: false,
            reporters: [
              {formatter: 'string', console: true}
                 ]
               }))
 .pipe(sass())
 .pipe(autoprefixer({
           browsers: ['last 2 versions'],
           cascade: false
       }))
 .pipe(cssmin())
 .pipe(gulp.dest('./public/css'))
});

gulp.task('img', () => {
  return gulp.src('./src/img/**/*')
  .pipe(changed('./public/assets/img'))
  .pipe(gulp.dest('./public/assets/img'))
  .pipe(livereload())
});

gulp.task('imgbuild', () => {
  return gulp.src('./src/img/**/*')
  .pipe(imagemin())
  .pipe(gulp.dest('./public/assets/img'))
});


gulp.task('js', () => {
  return gulp.src('./src/js/**/*.js')
  .pipe(changed('./public/js'))
  .pipe(eslint({
			fix: true
		}))
  .pipe(eslint.result(result => {
          // Called for each ESLint result.
          console.log(`ESLint result: ${result.filePath}`);
          console.log(`# Messages: ${result.messages.length}`);
          console.log(`# Warnings: ${result.warningCount}`);
          console.log(`# Errors: ${result.errorCount}`);
      }))
  .pipe(eslint.format())
  .pipe(babel())
  .pipe(gulp.dest('./public/js'))
  .pipe(livereload())
});

gulp.task('jsbuild', () => {
  return gulp.src('./src/js/**/*.js')
  .pipe(eslint({
			fix: true
		}))
  .pipe(eslint.result(result => {
          // Called for each ESLint result.
          console.log(`ESLint result: ${result.filePath}`);
          console.log(`# Messages: ${result.messages.length}`);
          console.log(`# Warnings: ${result.warningCount}`);
          console.log(`# Errors: ${result.errorCount}`);
      }))
  .pipe(eslint.format())
  .pipe(babel())
  .pipe(uglify())
  .pipe(gulp.dest('./public/js'))
});

gulp.task('buildcleaner', () => {
  del(['public/js/**/*','public/assets/img/**/*','public/css/**/*']).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
});
});

gulp.task('start', () => {
  livereload.listen({quiet:true});
  nodemon({
    script: 'start.js'
  , ext: 'json pug js',
  ignore: [
            'public/',
            'src/',
            'node_modules/'
        ],
  env: { 'NODE_ENV': 'development' }
  }).on('start', ()=>{livereload.reload()})
})

gulp.watch('src/js/**/*.js', ['js'], function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});

gulp.watch('src/css/**/*.scss', ['scss'], function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});

gulp.watch('src/img/**/*', ['img'], function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});

// gulp.task('watch', () => {
//     livereload.listen();
//     gulp.watch(['/**/*.js','!node_modules/**'],['js'], function(event) {
//     console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
//   });
// })


gulp.task('default', [ 'scss','img','js','start' ]);

gulp.task('build', [ 'buildcleaner','scssbuild','imgbuild','jsbuild','start' ]);
