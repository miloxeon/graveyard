import React from 'react'
import css from './style.module.css'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const compressionModes = ['smart', 'best', 'better', 'normal', 'lighter', 'lightest']

const sizes = {
	smart: {
		details: '515 KB',
		solid: '68 KB',
		gradient: '14 KB',
	},
	best: {
		details: '1.2 MB',
		solid: '140 KB',
		gradient: '52 KB',
	},
	better: {
		details: '652 KB',
		solid: '93 KB',
		gradient: '25 KB',
	},
	normal: {
		details: '538 KB',
		solid: '72 KB',
		gradient: '15 KB',
	},
	lighter: {
		details: '442 KB',
		solid: '55 KB',
		gradient: '12 KB',
	},
	lightest: {
		details: '251 KB',
		solid: '31 KB',
		gradient: '8 KB',
	},
}

export default () => {
	return (
		<div className={css.root}>
			<div className={css.row}>
				<Zoom className={css.imageWrapper}>
					<img
						className={css.img}
						src="https://ucarecdn.com/29e256ce-68ef-4439-854c-361e366c6a50/-/format/jpg/details.jpg"
						alt={`Details, no compression`}
						width={1000}
						height={1000}
					/>
					<span className={css.size}>526 KB</span>
				</Zoom>

				<Zoom className={css.imageWrapper}>
					<img
						className={css.img}
						src="https://ucarecdn.com/fefb0832-acfd-47f7-8711-45dcd5a2cb97/-/format/jpg/solid.jpg"
						alt={`Solid background, no compression`}
						width={1000}
						height={1000}
					/>
					<span className={css.size}>71 KB</span>
				</Zoom>

				<Zoom className={css.imageWrapper}>
					<img
						className={css.img}
						src="https://ucarecdn.com/1d9c6c8f-3798-489d-a96f-72ad8cb790d7/-/format/jpg/gradient.jpg"
						alt={`Gradient, no compression`}
						width={1000}
						height={1000}
					/>
					<span className={css.size}>16 KB</span>
				</Zoom>
				<span className={css.mode}>Original</span>
			</div>

			{compressionModes.map(mode => {
				const detailsSrc = mode =>
					`https://ucarecdn.com/29e256ce-68ef-4439-854c-361e366c6a50/-/format/jpg/-/quality/${mode}/details.jpg`

				const solidSrc = mode =>
					`https://ucarecdn.com/fefb0832-acfd-47f7-8711-45dcd5a2cb97/-/format/jpg/-/quality/${mode}/solid.jpg`

				const gradientSrc = mode =>
					`https://ucarecdn.com/1d9c6c8f-3798-489d-a96f-72ad8cb790d7/-/format/jpg/-/quality/${mode}/gradient.jpg`

				return (
					<div key={mode} className={css.row}>
						<Zoom className={css.imageWrapper}>
							<img
								className={css.img}
								src={detailsSrc(mode)}
								alt={`Details, ${mode} compression`}
								width={1000}
								height={1000}
							/>
							<span className={css.size}>{sizes[mode]['details']}</span>
						</Zoom>

						<Zoom className={css.imageWrapper}>
							<img
								className={css.img}
								src={solidSrc(mode)}
								alt={`Solid background, ${mode} compression`}
								width={1000}
								height={1000}
							/>
							<span className={css.size}>{sizes[mode]['solid']}</span>
						</Zoom>

						<Zoom className={css.imageWrapper}>
							<img
								className={css.img}
								src={gradientSrc(mode)}
								alt={`Gradient, ${mode} compression`}
								width={1000}
								height={1000}
							/>
							<span className={css.size}>{sizes[mode]['gradient']}</span>
						</Zoom>
						<span className={css.mode}>{mode}</span>
					</div>
				)
			})}
		</div>
	)
}
