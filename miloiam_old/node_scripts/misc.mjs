import fs from 'fs'
import { render } from './lib.mjs'

export const generateIndex = () => {
	const template = fs.readFileSync(`templates/index.mustache`, { encoding: 'utf8' })
	const output = render(template)
	fs.writeFileSync(`public/index.html`, output, { flag: 'w' })
}

export const reloadAssets = () => {
	if (fs.existsSync('public/assets')) fs.rmSync('public/assets', { recursive: true })
	fs.cpSync('assets', 'public/assets', { recursive: true })
}
