import React from 'react'
import css from './style.module.css'
import 'rc-slider/assets/index.css'
import Slider from 'rc-slider'
import { debounce } from 'lodash'

export default () => {
	const [brightness, set_brightness] = React.useState(0)
	const [exposure, set_exposure] = React.useState(0)
	const [gamma, set_gamma] = React.useState(100)
	const [contrast, set_contrast] = React.useState(0)
	const [saturation, set_saturation] = React.useState(0)
	const [vibrance, set_vibrance] = React.useState(0)
	const [warmth, set_warmth] = React.useState(0)
	const [src, setSrc] = React.useState(
		'https://ucarecdn.com/2eef1453-8c00-4ca2-8117-8e0ecc5173be/-/preview/400x400/-/format/jpg/eastern.jpg'
	)

	React.useEffect(
		debounce(
			() =>
				setSrc(
					`https://ucarecdn.com/2eef1453-8c00-4ca2-8117-8e0ecc5173be/-/preview/400x400/-/format/jpg/-/brightness/${brightness}/-/exposure/${exposure}/-/gamma/${gamma}/-/contrast/${contrast}/-/saturation/${saturation}/-/vibrance/${vibrance}/-/warmth/${warmth}/eastern.jpg`
				),
			200
		),
		[brightness, exposure, gamma, contrast, saturation, vibrance, warmth]
	)

	return (
		<div className={css.root}>
			<img src={src} className={css.img} alt="" width={400} />

			<div className={css.filters}>
				<label for="brightness" className={css.label}>
					/brightness/
				</label>
				<Slider
					id="brightness"
					onChange={set_brightness}
					value={brightness}
					min={-100}
					max={100}
				/>
				<span className={css.value}>{brightness}</span>

				<label for="exposure" className={css.label}>
					/exposure/
				</label>
				<Slider id="exposure" onChange={set_exposure} value={exposure} min={-500} max={500} />
				<span className={css.value}>{exposure}</span>

				<label for="gamma" className={css.label}>
					/gamma/
				</label>
				<Slider id="gamma" onChange={set_gamma} value={gamma} min={0} max={1000} />
				<span className={css.value}>{gamma}</span>

				<label for="contrast" className={css.label}>
					/contrast/
				</label>
				<Slider id="contrast" onChange={set_contrast} value={contrast} min={-100} max={500} />
				<span className={css.value}>{contrast}</span>

				<label for="saturation" className={css.label}>
					/saturation/
				</label>
				<Slider
					id="saturation"
					onChange={set_saturation}
					value={saturation}
					min={-100}
					max={500}
				/>
				<span className={css.value}>{saturation}</span>

				<label for="vibrance" className={css.label}>
					/vibrance/
				</label>
				<Slider id="vibrance" onChange={set_vibrance} value={vibrance} min={-100} max={500} />
				<span className={css.value}>{vibrance}</span>

				<label for="warmth" className={css.label}>
					/warmth/
				</label>
				<Slider id="warmth" onChange={set_warmth} value={warmth} min={-100} max={100} />
				<span className={css.value}>{warmth}</span>
			</div>
		</div>
	)
}
