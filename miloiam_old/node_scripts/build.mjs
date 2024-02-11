import fs from 'fs'
// import { generateArticles } from './generateArticles.mjs'
// import { generateProjects } from './generateProjects.mjs'
// import { generateIndex, reloadAssets } from './misc.mjs'
import { generateIndex } from './misc.mjs'

if (fs.existsSync('public')) fs.rmSync('public', { recursive: true })
fs.mkdirSync('public')

// generateProjects()
// generateArticles()
generateIndex()
// reloadAssets()
