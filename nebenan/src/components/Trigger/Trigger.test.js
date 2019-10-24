import React from 'react'
import ReactDOM from 'react-dom'
import Trigger from './index.js'

it('Renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Trigger trigger="hi" toggle={ console.log } isOpen={ true } />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('Renders without label', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Trigger toggle={ console.log } isOpen={ true } />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('Renders without label and handler', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Trigger isOpen={ true } />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('Renders without any props', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Trigger />, div)
  ReactDOM.unmountComponentAtNode(div)
})
