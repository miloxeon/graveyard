const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
	title: 'Uploadcare Docs',
	tagline: '',
	url: 'https://amazing-varahamihira-03d626.netlify.app',
	baseUrl: '/',
	onBrokenLinks: 'warn',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',
	organizationName: 'uploadcare', // Usually your GitHub org/user name.
	projectName: 'docs', // Usually your repo name.
	themes: ['@docusaurus/theme-live-codeblock'],
	themeConfig: {
		navbar: {
			title: 'Uploadcare Docs',
			logo: {
				alt: '',
				src: 'img/logo.svg',
			},
			items: [
				{
					type: 'doc',
					docId: 'core/quickStart',
					label: 'Core',
				},
				{
					type: 'doc',
					docId: 'platform/imageTransformations',
					label: 'Platform',
				},
				{
					type: 'doc',
					docId: 'integrations/overview',
					label: 'Integrations',
				},
				{
					href: 'https://github.com/uploadcare/docs',
					label: 'GitHub',
					position: 'right',
				},
			],
		},
		footer: {
			copyright: `Copyright © ${new Date().getFullYear()} Uploadcare Inc.`,
		},
		prism: {
			theme: lightCodeTheme,
			darkTheme: darkCodeTheme,
		},
	},
	presets: [
		[
			'@docusaurus/preset-classic',
			{
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					// Please change this to your repo.
					editUrl: 'https://github.com/uploadcare/docs',
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			},
		],
	],
}
