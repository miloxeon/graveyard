import chokidar from 'chokidar'
import { generateArticles } from './generateArticles.mjs'
import { generateProjects } from './generateProjects.mjs'
import { includesMultiple } from './lib.mjs'
import { generateIndex, reloadAssets } from './misc.mjs'

const watcher = chokidar.watch(['articles', 'assets', 'data', 'templates'], {
	ignoreInitial: true,
})

watcher.on('all', (_event, path) => {
	if (includesMultiple(path, ['projects.yaml', 'templates/projects.mustache']))
		return generateProjects()
	if (includesMultiple(path, ['data/articles', 'templates/article'])) return generateArticles()
	if (includesMultiple(path, ['templates/index'])) return generateIndex()
	if (includesMultiple(path, ['assets'])) return reloadAssets()
})
