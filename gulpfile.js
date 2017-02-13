var gulp = require('gulp');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('cleancss', function(){
	gulp.src('app/source/scss/*.scss')
		.pipe(plumber())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest('dist/css'))
		.pipe(connect.reload());
});

gulp.task('cleanjs', function(){
	gulp.src('app/source/js/*.js')
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(connect.reload());
});

gulp.task('watch', function(){
	gulp.watch(['app/source/scss/*.scss', 'app/source/js/*.js'], ['cleancss', 'cleanjs']);
});

gulp.task('startup', ['connect', 'watch']);