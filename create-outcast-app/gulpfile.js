const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const concatCss = require('gulp-concat-css')
const csso = require('gulp-csso')
const del = require('del')
const include = require('gulp-include')

const buildPage = (rootFolder, pageName, pagePrefix) => {
	const cssSrc = `${rootFolder}/${pageName}.css`
	const htmlSrc = `${rootFolder}/${pageName}.html`
	const targetFolder = pagePrefix ? `./public/${pagePrefix}` : './public'

	const htmlMinParams = {
		collapseWhitespace: true,
		removeComments: true,
	}

	const buildHtml = () =>
		gulp
			.src(htmlSrc)
			.pipe(include())
			.on('error', console.error)
			.pipe(htmlmin(htmlMinParams))
			.pipe(gulp.dest(targetFolder))

	const buildCSS = () =>
		gulp
			.src(cssSrc)
			.pipe(concatCss(`${pageName}.css`))
			.pipe(csso())
			.pipe(gulp.dest(targetFolder))

	return [buildHtml, buildCSS]
}

gulp.task('cleanup', () => del(['./public']))
gulp.task('vendors', () => gulp.src('./src/assets/**/*').pipe(gulp.dest('./public/assets')))
gulp.task('js', () => gulp.src('./src/scripts/**/*').pipe(gulp.dest('./public/scripts')))
gulp.task('static', () => gulp.src('./src/static-root/**/*').pipe(gulp.dest('./public')))

// multiple pages
const [indexHtml, indexCSS] = buildPage('./src/pages/index', 'index')

gulp.task('html-index', indexHtml)
gulp.task('html', gulp.parallel('html-index'))

gulp.task('css-index', indexCSS)
gulp.task('css', gulp.parallel('css-index'))

gulp.task(
	'compile',
	gulp.series('cleanup', gulp.parallel('css', 'html', 'js', 'vendors', 'static'))
)
gulp.task('watch', () => {
	gulp.watch('./src/**/*.css', gulp.series('css'))
	gulp.watch('./src/**/*.html', gulp.series('html'))
	gulp.watch('./src/**/*.svg', gulp.series('html'))
	gulp.watch('./src/scripts/**/*', gulp.series('js'))
	gulp.watch('./src/assets/**/*', gulp.series('vendors'))
	gulp.watch('./src/static-root/**/*', gulp.series('static'))
})

gulp.task('default', gulp.series('compile', 'watch'))
