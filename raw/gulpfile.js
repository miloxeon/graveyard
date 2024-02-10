const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const concatCss = require('gulp-concat-css')
const csso = require('gulp-csso')
const twig = require('gulp-twig')
const del = require('del')
const connect = require('gulp-connect')

gulp.task('serve', async () => {
	return connect.server({
		root: 'public',
		livereload: true,
	})
})

gulp.task('cleanup', async () => {
	return del(['./public/*.*'])
})

gulp.task('css', async () => {
	return gulp
		.src('./src/index.css')
		.pipe(concatCss('bundle.css'))
		.pipe(csso())
		.pipe(gulp.dest('./public'))
		.pipe(connect.reload())
})

gulp.task('twig', async () => {
	return gulp
		.src('./src/index.twig')
		.pipe(twig())
		.pipe(
			htmlmin({
				collapseWhitespace: true,
				removeComments: true,
			})
		)
		.pipe(gulp.dest('./public'))
		.pipe(connect.reload())
})

gulp.task('compile', gulp.series('cleanup', 'css', 'twig'))

gulp.task('watch', async () => {
	gulp.watch('./src/**/*.twig', gulp.series('twig'))
	gulp.watch('./src/**/*.css', gulp.series('css'))
})

gulp.task('default', gulp.series('compile', gulp.parallel('watch', 'serve')))
