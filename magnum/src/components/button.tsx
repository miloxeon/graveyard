import styled from 'styled-components'
import { HTMLProps, forwardRef } from 'react'

const Root = styled.button`
	--outline-color: #07165b;

	position: relative;
	font: inherit;
	background-color: #200b10;
	color: white;
	border: 1px solid transparent;
	padding: calc(0.5em - 1px) calc(0.7em - 1px);
	border-radius: 0.5em;
	transition: transform 0.2s, box-shadow 0.2s;

	:disabled {
		filter: contrast(50%) grayscale();
	}

	:hover {
		transform: scale(1.04);
		transition-duration: 0s;
	}

	:focus {
		outline: none;
		box-shadow: 0 0 0 3px var(--outline-color);
		transition-duration: 0s;
	}
`

interface Props extends HTMLProps<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
	const { type: typeRaw, ref: _, ...rest } = props
	const type = typeRaw as 'button' | 'submit' | 'reset' | undefined

	return <Root {...rest} ref={ref} type={type} as="button" />
})

export default Button
