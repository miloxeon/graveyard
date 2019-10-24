var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	browserSync = require('browser-sync').create();


gulp.task('style', function () {
	return gulp.src('./sass/kardinal.scss')
		.pipe(sass())
		.pipe(concat('kardinal.css'))
		.pipe(autoprefixer(
			'last 2 version',
			'safari 5',
			'ie 8',
			'ie 9',
			'opera 12.1',
			'ios 6',
			'android 4'
		))
		.pipe(cleanCSS())
		.pipe(gulp.dest('./'));
})

gulp.task('watch', ['style'], function () {
	browserSync.init({
		server: {
			baseDir: './',
			index: 'index.html'
		}
	});
	gulp.watch('./sass/**/*.*', ['style']);
	gulp.watch("./*").on('change', browserSync.reload);
});

gulp.task('default', ['style']);
