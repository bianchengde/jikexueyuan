var gulp = require('gulp'),
    compass = require('gulp-compass'),
    autoprefixer=require('gulp-autoprefixer'),
    clean=require('gulp-clean'),
    concat=require('gulp-concat'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
	mincss=require('gulp-minify-css'),
	livereload=require('gulp-livereload');
	
	


//样式
gulp.task('styles', function() {  
  return gulp.src('./sass/bus.scss')
    .pipe(compass({
        config_file: './config.rb',
        css: 'stylesheets',
        sass: 'sass'
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('app/assets/temp'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(mincss())
    .pipe(gulp.dest('app/assets/temp'))
    .pipe(notify({ message: 'Styles task complete' }));
});



gulp.task('default', ['clean'], function() {  
    gulp.start('styles');
});


gulp.task('watch',function(){
	
	//监控scss文件
	gulp.watch('./sass/*.scss',['styles']);
	
});



gulp.task('watch', function() {

  // 建立即时重整伺服器
  var server = livereload();

  // 看守所有位在app/assets/  目录下的档案，一旦有更动，便进行重整
  gulp.watch(['app/assets/**']).on('change', function(file) {
    server.changed(file.path);
  });

});




