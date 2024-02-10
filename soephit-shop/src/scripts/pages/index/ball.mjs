import Two from 'https://cdn.skypack.dev/two.js@latest'

export const renderBall = (shouldAttachEvents = false) => {
	const two = new Two({
		type: Two.Types.svg,
		fullscreen: true,
		autostart: true,
	}).appendTo(document.body)

	two.renderer.domElement.style.pointerEvents = 'none'
	two.renderer.domElement.style.zIndex = '-1'
	two.renderer.domElement.style.height = '100%'

	const heartRect = document.querySelector('[data-heart]').getBoundingClientRect()

	const cx = heartRect.left + heartRect.width / 2
	const cy = heartRect.top + heartRect.height / 2

	const delta = new Two.Vector()
	const mouse = new Two.Vector(cx, cy)
	const drag = 0.1
	const radius = heartRect.width / 2

	const shape = new Two.Circle(0, 0, radius, 32)

	const ball = new Two.Path(shape.vertices, true, true)
	ball.position.set(cx, cy)
	ball.noStroke().fill = 'rgb(255, 53, 127)'

	for (let i = 0; i < ball.vertices.length; i++) {
		const v = ball.vertices[i]
		v.origin = v.clone()
	}

	two.add(ball)

	if (shouldAttachEvents) {
		window.addEventListener(
			'mousemove',
			e => {
				mouse.x = e.clientX
				mouse.y = e.clientY
			},
			false
		)

		// window.addEventListener(
		// 	'touchstart',
		// 	e => {
		// 		e.preventDefault()
		// 		return false
		// 	},
		// 	false
		// )

		// window.addEventListener(
		// 	'touchmove',
		// 	e => {
		// 		e.preventDefault()
		// 		const touch = e.changedTouches[0]
		// 		mouse.x = touch.pageX
		// 		mouse.y = touch.pageY
		// 		return false
		// 	},
		// 	false
		// )
	}

	two.bind('update', frameCount => {
		delta.copy(mouse).subSelf(ball.translation)

		const beat = 1 + Math.sin(frameCount / 100) / 6

		ball.scale = beat

		for (let i = 0; i < ball.vertices.length; i++) {
			const v = ball.vertices[i]
			const dist = v.origin.distanceTo(delta)
			const pct = (dist / radius) * 4

			const x = delta.x * pct
			const y = delta.y * pct

			const destx = v.origin.x - x
			const desty = v.origin.y - y

			v.x += (destx - v.x) * drag
			v.y += (desty - v.y) * drag
		}

		ball.translation.addSelf(delta)
	})
}

const mouse = !window.matchMedia('(any-pointer:coarse)').matches
renderBall(mouse)
