import React, { Component } from 'react'
import decide from 'decider'
import styles from './styles.module.css'
import Trigger from '../Trigger'
import { ReactComponent as Close } from './close.svg'

import {
  initialState,
  enable,
  disable,
  toggle,
  getVerticalPosition,
  getHorizontalPosition,
  handleEsc,
  handleClickOutside,
  enhanceChildren
} from './logic.js'


class Dropdown extends Component {
  constructor (props) {
    super (props)

    this.state = initialState
    this.margin = 10  // dropdown margins
    this.maxWidth = 400 // max dropdown width
    this.triggerRef = React.createRef()
    this.rootRef = React.createRef()
    this.dropdownRef = React.createRef()

    // methods binding
    this.enable = enable.bind(this)
    this.disable = disable.bind(this)
    this.toggle = toggle.bind(this)
    this.handleEsc = handleEsc.bind(this)
    this.handleClickOutside = handleClickOutside.bind(this)
    this.getVerticalPosition = getVerticalPosition.bind(this)
    this.getHorizontalPosition = getHorizontalPosition.bind(this)
    this.enhanceChildren = enhanceChildren.bind(this)
  }

  componentDidMount () {
    window.addEventListener('keydown', this.handleEsc)
    window.addEventListener('mouseup', this.handleClickOutside)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleEsc)
    window.removeEventListener('mouseup', this.handleClickOutside)
  }

  render () {
    return (
      <div
        className={ [styles.root, this.props.className].join(' ') }
        ref={ this.rootRef }
        style={ this.props.style }
      >
        <Trigger
          toggle={ this.toggle }
          innerRef={ this.triggerRef }
          trigger={ this.props.trigger }
          isOpen={ this.state.active }
        />
        <div
          style={ this.state.dropdownStyle }
          ref={ this.dropdownRef }
          className={ decide(styles, {
            content: true,
            hidden: !this.state.active
          })}
        >
          <button
            className={ styles.close }
            onClick={ this.disable }
          >
            { "Close" }
            <Close className={ styles.icon } />
          </button>
          { this.state.active ? this.enhanceChildren(this.props.children) : '' }
        </div>
      </div>
    )
  }
}

export default Dropdown
