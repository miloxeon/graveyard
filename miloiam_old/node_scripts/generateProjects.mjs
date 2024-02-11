import fs from 'fs'
import yaml from 'js-yaml'
import { render, calculateAge } from './lib.mjs'

export const generateProjects = () => {
	const projects = fs.readFileSync('data/projects.yaml', { encoding: 'utf8' })
	const parsed = yaml.load(projects)

	// date desc
	const sorted = [...parsed].sort((a, b) => {
		const dateA = new Date(a['Creation date'])
		const dateB = new Date(b['Creation date'])
		return dateA < dateB ? 1 : -1
	})

	const columns = Object.keys(sorted[0])
	const thead = `
		<tr>
			${columns.map(x => `<th>${x}</th>`).join('')}
		</tr>
	`

	const tbody = sorted
		.map(project => {
			const values = Object.values(project)
			const [creationDate, name, whatItIs, whyItFailed, tags, launched, link] = values
			return `
				<tr>
					<td>${creationDate}</td>
					<td>${name}</td>
					<td>${whatItIs}</td>
					<td>${whyItFailed}</td>
					<td>
						${tags
							.split(', ')
							.map(tag => `<span class="tag">${tag}</span>`)
							.join('')}
					</td>
					<td>
						${launched === 'Yes' ? '✅' : ''}
					</td>
					<td>
						${link && `<a href="${link}">${link}</a>`}
					</td>
				</tr>
			`
		})
		.join('')

	const total = sorted.length
	const start = sorted[sorted.length - 1]['Creation date']
	const years = calculateAge(new Date(start))
	const launched = sorted.filter(project => project['Launched'] === 'Yes').length
	const launchedPercentage = Math.floor((launched / total) * 100)

	const template = fs.readFileSync(`templates/projects.mustache`, { encoding: 'utf8' })
	const output = render(template, {
		thead,
		tbody,
		total,
		start,
		years,
		launched,
		launchedPercentage,
	})
	fs.writeFileSync(`public/projects.html`, output, { flag: 'w' })
}
