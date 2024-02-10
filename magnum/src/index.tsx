import { FC, StrictMode } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import { Button } from './components'

const App: FC = () => {
	return (
		<div>
			<Button>Hello!</Button>
		</div>
	)
}

ReactDOM.render(
	<StrictMode>
		<App />
	</StrictMode>,
	document.getElementById('root')
)
