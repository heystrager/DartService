var gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('pug', function(){
  return gulp.src('app/pug/*.pug')
  .pipe(pug({
    locals: 'app/pug/**/*.pug'
  }))
  .pipe(gulp.dest('app'))
});

gulp.task('sass',function(){
  return gulp.src('app/scss/style.scss')
  .pipe(sass({
    locals: 'app/scss/**/*.scss'
  }))
  .pipe(autoprefixer(['last 15 versions', '>1%', 'ie 8', 'ie 7'], {cascade: true}))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function(){
  return gulp.src([
    'app/libs/*.js'
  ])
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'));

});

gulp.task('css-libs', ['sass'],  function(){
  return gulp.src('app/css/libs.css')
  .pipe(cssnano())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

gulp.task('clean', function(){
  return del.sync('dist');
});

gulp.task('clear', function(){
  return cache.clearAll();
});

gulp.task('img', function(){
  return gulp.src('app/img/**/*')
  .pipe(cache(imagemin({
    interlaced: true,
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  })))
  .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync', 'css-libs','scripts'], function(){
  gulp.watch('app/scss/**/*.scss',['sass']);
  gulp.watch('app/pug/**/*.pug',['pug']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/*.js', browserSync.reload);
});


gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function(){
  var buildCss = gulp.src([
    'app/css/*.css',
  ])
  .pipe(gulp.dest('dist/css'));

   var buildFonts = gulp.src('app/fonts/**/*')
   .pipe(gulp.dest('dist/fonts'));

   var buildJs = gulp.src('app/js/**/*')
   .pipe(gulp.dest('dist/js'));

   var buildHtml = gulp.src('app/*.html')
   .pipe(gulp.dest('dist'));
});