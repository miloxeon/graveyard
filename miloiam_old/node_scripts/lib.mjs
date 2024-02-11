import MarkdownIt from 'markdown-it'
import mustache from 'mustache'
import hljs from 'highlight.js'

export const md = new MarkdownIt({
	html: true,
	typographer: true,
	highlight: (str, language) => {
		if (language && hljs.getLanguage(language)) {
			return hljs.highlight(str, { language }).value
		}
		return ''
	},
})

export const render = (template, data) =>
	mustache.render(template, data, null, {
		escape: x => x,
	})

export const calculateAge = birthday => {
	var ageDifMs = Date.now() - birthday
	var ageDate = new Date(ageDifMs)
	return Math.abs(ageDate.getUTCFullYear() - 1970)
}

export const includesMultiple = (string, substrings) => {
	for (let i = 0; i < substrings.length; i++) {
		const substring = substrings[i]
		if (string.includes(substring)) return true
	}
	return false
}
