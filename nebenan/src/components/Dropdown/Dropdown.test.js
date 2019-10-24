import React from 'react'
import ReactDOM from 'react-dom'
import Dropdown from './index.js'
import { getVerticalPosition, getHorizontalPosition } from './logic.js'

it('Renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Dropdown trigger="test" />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('Renders without any props', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Dropdown />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('Always inside its parent', () => {
  const triggerRect = {
    bottom: 133,
    height: 16,
    left: 133,
    right: 178,
    top: 117,
    width: 45,
    x: 133,
    y: 117
  }

  const windowDimensions = {
    width: 188,
    height: 143
  }

  const mockVerticalPosition = getVerticalPosition.bind({
    maxWidth: 400,
    margin: 10
  })

  const mockHorizontalPosition = getHorizontalPosition.bind({
    maxWidth: 400,
    margin: 10
  })

  const verticalPosition = mockVerticalPosition(triggerRect, windowDimensions)
  const horizontalPosition = mockHorizontalPosition(triggerRect, windowDimensions)


  expect(parseInt(verticalPosition.maxHeight)).toBeLessThan(windowDimensions.height)
  expect(parseInt(horizontalPosition.width)).toBeLessThan(windowDimensions.width)
})
