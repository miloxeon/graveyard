import React from 'react'
import css from './style.module.css'

const filterNames = [
	'adaris',
	'briaril',
	'calarel',
	'carris',
	'cynarel',
	'cyren',
	'elmet',
	'elonni',
	'enzana',
	'erydark',
	'fenralan',
	'ferand',
	'galen',
	'gavin',
	'gethriel',
	'iorill',
	'iothari',
	'iselva',
	'jadis',
	'lavra',
	'misiara',
	'namala',
	'nerion',
	'nethari',
	'pamaya',
	'sarnar',
	'sedis',
	'sewen',
	'sorahel',
	'sorlen',
	'tarian',
	'thellassan',
	'varriel',
	'varven',
	'vevera',
	'virkas',
	'yedis',
	'yllara',
	'zatvel',
	'zevcen',
]

export default () => {
	return (
		<div className={css.root}>
			{filterNames.map(filterName => {
				const src = `https://ucarecdn.com/2f93a9ac-414b-4cbe-aef1-0462e3bc8cd8/-/quality/lighter/-/preview/320x320/-/filter/${filterName}/100/`
				return (
					<figure key={filterName} className={css.figure}>
						<img className={css.img} src={src} alt={filterName} width={320} height={213} />
						<figcaption className={css.figcaption}>{filterName}</figcaption>
					</figure>
				)
			})}
		</div>
	)
}
