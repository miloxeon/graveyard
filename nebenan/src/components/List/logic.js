import React from 'react'
import { wrapHandler } from './helpers.js'
import styles from './styles.module.css'

// check if no one of the menu items is focused
export function allItemsAreBlurred () {
  return this.state.focus.reduce((a, b) => a || b)
}


// called when menu fires onBlur event
export function onMenuBlur () {
  if (this.allItemsAreBlurred()) {
    this.setState(this.initialState)
  }
}


// called on item when it fires onFocus event
export function onItemFocus (e) {
  this.editFocus(e.target.dataset.index, true)
}


// called on item when it fires onBlur event
export function onItemBlur (e) {
  this.editFocus(e.target.dataset.index, false)
}

// edit the focus data model. Index is element index, isFocus is either true or false
export function editFocus (index, isFocused) {
  const newFocus = [].concat(this.state.focus)
  newFocus[index] = Boolean(isFocused)

  this.setState({
    ...this.state,
    focus: newFocus
  })
}


// handle key press
export function onKeyPress (e) {
  if (this.allItemsAreBlurred()) {
    switch (e.code) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault()
        this.down()
        break

      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault()
        this.up()
        break

      default: break
    }
  }
}


// move the focus up
export function up () {
  const current = this.state.focus.indexOf(true)
  const next = current - 1 < 0 ? this.limit : current - 1
  this.editFocus(current, false)
  this.editFocus(next, true)
  this.updateFocus()
}


// move the focus down
export function down () {
  const current = this.state.focus.indexOf(true)
  const next = current + 1 > this.limit ? 0 : current + 1
  this.editFocus(current, false)
  this.editFocus(next, true)
  this.updateFocus()
}


// apply new focus data model to the elements
export function updateFocus () {
  const elementToReceiveFocus = this.itemRefs[this.state.focus.indexOf(true)]

  if (elementToReceiveFocus) {
    elementToReceiveFocus.current.focus()
  }
}


// if a link passed as a child, use it as an element, otherwise wrap
// content in button

export function wrapContent (content, index) {
  const commons = {
    className: styles.button,
    onFocus: this.onItemFocus,
    onBlur: this.onItemBlur,
    'data-index': index,
    role: 'menuitem',
    ref: this.itemRefs[index]
  }

  return (content && content.type === 'a') ? (
    <a
      { ...content.props }
      { ...commons }
      href={ content.props.href }
      // pass the whole element inside because you might want to track its attributes and not only its value
      onClick={ () => this.props.onChange(this.itemRefs[index].current)}
      onKeyDown={ e => {
        if (e.key === 'Enter' || e.key === ' ') {
          // prevent double callback on Enter
          e.preventDefault()
          this.props.onChange(this.itemRefs[index].current)
        }
      }}
    >
      { content.props.children }
    </a>
  ) : (
    <button
      { ...commons }
      type="button"
      onClick={ wrapHandler(this.props.onChange, content) }
    >
      { content }
    </button>
  )
}
