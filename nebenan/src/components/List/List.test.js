import React from 'react'
import ReactDOM from 'react-dom'
import List from './index.js'

it('Renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<List onChange={ console.log } options={["1", "2"]} />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('Renders without options', () => {
  const div = document.createElement('div')
  ReactDOM.render(<List onChange={ console.log } />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('Renders without handler', () => {
  const div = document.createElement('div')
  ReactDOM.render(<List options={["1", "2"]} />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('Renders without both options and handler', () => {
  const div = document.createElement('div')
  ReactDOM.render(<List />, div)
  ReactDOM.unmountComponentAtNode(div)
})
