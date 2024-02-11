import fs from 'fs'
import matter from 'gray-matter'
import { render, md } from './lib.mjs'

export const generateArticles = () => {
	const articles = fs.readdirSync('data/articles')
	const sortedArticles = [...articles].sort().reverse()

	// extract article data
	const articlesData = sortedArticles.map(filename => {
		const article = fs.readFileSync(`data/articles/${filename}`, {
			encoding: 'utf8',
		})

		// content
		const { data: frontmatter, content } = matter(article)
		const html = md.render(content)

		// date
		const [name] = filename.split('.')
		const tuple = name.split('-')
		let date = [tuple[0], tuple[1], tuple[2]].join('-')

		// title
		const basicTitleLower = tuple.slice(3).join(' ')
		const basicTitle = basicTitleLower.charAt(0).toUpperCase() + basicTitleLower.slice(1)
		const realTitle = frontmatter.title
		const title = realTitle || basicTitle

		// href
		let href = `/articles/${name}.html`
		const path = `public/articles/${name}.html`

		const { comingSoon } = frontmatter

		if (comingSoon) {
			date = '--[SOON]--'
			href = '#'
		}

		return { ...frontmatter, comingSoon, html, date, title, href, path }
	})

	if (!fs.existsSync('public/articles')) fs.mkdirSync(`public/articles`)

	// generate individual pages
	const one = fs.readFileSync(`templates/article.mustache`, {
		encoding: 'utf8',
	})
	articlesData.forEach(article => {
		const { path, comingSoon } = article
		if (comingSoon) return
		const output = render(one, { ...article })
		fs.writeFileSync(path, output, { flag: 'w' })
	})

	// generate index.html for articles
	const all = fs.readFileSync(`templates/articles.mustache`, {
		encoding: 'utf8',
	})
	const output = render(all, { articles: articlesData })
	fs.writeFileSync(`public/articles/index.html`, output, { flag: 'w' })
}
