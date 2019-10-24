import React, { Component } from 'react'
import styles from './styles.module.css'
import {
  onMenuBlur,
  onItemFocus,
  onItemBlur,
  onKeyPress,
  up,
  down,
  updateFocus,
  editFocus,
  allItemsAreBlurred,
  wrapContent
} from './logic.js'

class List extends Component {
  constructor (props) {
    super (props)

    this.options = this.props.options || []
    this.itemRefs = this.options.map(() => React.createRef())
    this.limit = this.options.length - 1

    this.initialState = {
      focus: this.options.map(() => false)
    }

    this.state = Object.assign({}, this.initialState)

    this.onMenuBlur = onMenuBlur.bind(this)
    this.onItemFocus = onItemFocus.bind(this)
    this.onItemBlur = onItemBlur.bind(this)
    this.onKeyPress = onKeyPress.bind(this)
    this.up = up.bind(this)
    this.down = down.bind(this)
    this.updateFocus = updateFocus.bind(this)
    this.editFocus = editFocus.bind(this)
    this.allItemsAreBlurred = allItemsAreBlurred.bind(this)
    this.wrapContent = wrapContent.bind(this)
  }

  componentDidMount () {
    window.addEventListener('keydown', this.onKeyPress)
  }

  componentWillUnmount () {
    this.setState(this.initialState)
    window.removeEventListener('keydown', this.onKeyPress)
  }

  render () {
    return (
      <ul
        className={ styles.root }
        role="menu"
        onBlur={ this.onMenuBlur }
        onFocus={ this.onMenuFocus }
      >
        { this.options.map((content, index) => (
            <li
              className={ styles.item }
              key={ 'item' + index }
            >
              { this.wrapContent(content, index) }
            </li>
        )) }
      </ul>
    )
  }
}

export default List
