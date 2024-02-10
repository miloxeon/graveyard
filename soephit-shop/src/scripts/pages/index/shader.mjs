import { tween, createQuad, frag, vert } from './shaderUtils.mjs'

export const sketch = () => {
	// Create regl for handling GL stuff
	// eslint-disable-next-line no-undef
	const regl = createREGL({ extensions: ['OES_standard_derivatives'] })
	// A mesh for a flat plane
	const quad = createQuad()
	// Draw command
	const drawQuad = regl({
		// Fragment & Vertex shaders
		frag,
		vert,
		// Pass down props from javascript
		uniforms: {
			fade: regl.prop('fade'),
			aspect: regl.prop('aspect'),
			time: regl.prop('time'),
		},
		// Send mesh vertex attributes to shader
		attributes: {
			position: quad.positions,
		},
		// The indices for the quad mesh
		elements: regl.elements(quad.cells),
	})

	// regl.frame(({ time, viewportWidth, viewportHeight, drawingBufferWidth, drawingBufferHeight }) => {
	regl.frame(({ time, drawingBufferWidth, drawingBufferHeight }) => {
		// On each tick, update regl timers and sizes
		regl.poll()

		// Clear backbuffer with pure white
		regl.clear({
			color: [0, 0, 0, 0],
			depth: 1,
			stencil: 0,
		})

		// Draw generative / shader art
		const fade = tween({ time, duration: 2, delay: 0, ease: 'sineOut' })
		drawQuad({ time, fade, aspect: drawingBufferWidth / drawingBufferHeight })
	})
}

const mouse = !window.matchMedia('(any-pointer:coarse)').matches
if (mouse) sketch()
