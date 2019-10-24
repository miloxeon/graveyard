import React from 'react'
import List from '../List'
import { getRect, calculateDimensions, activateDropdown } from './helpers.js'

export const initialState = {
  active: false,
  dropdownStyle: {
    top: 'auto',
    bottom: 'auto',
    left: 'auto',
    right: 'auto',
    maxHeight: 'auto',
    width: 'auto'
  }
}

export function getVerticalPosition (triggerRect, windowDimensions) {
  const fromTriggerToTop = triggerRect.top
  const fromTriggerToBottom = windowDimensions.height - triggerRect.bottom

  return fromTriggerToTop < fromTriggerToBottom ? {
    top: '100%',
    maxHeight: fromTriggerToBottom - this.margin + 'px'
  } : {
    bottom: '100%',
    maxHeight: fromTriggerToTop - this.margin - 5 + 'px'
  }
}

export function getHorizontalPosition (triggerRect, windowDimensions) {
  const fromTriggerToLeft = triggerRect.left
  const fromTriggerToRight = windowDimensions.width - triggerRect.right

  return fromTriggerToLeft < fromTriggerToRight ? {
    left: 0,
    width: Math.min(windowDimensions.width - fromTriggerToLeft, this.maxWidth) - this.margin + 'px'
  } : {
    right: 0,
    width: Math.min(windowDimensions.width - fromTriggerToRight, this.maxWidth) - this.margin + 'px'
  }
}

export function toggle () {
  if (!this.state.active) {
    this.enable()
  } else {
    this.disable()
  }
}

export function enable () {
  const triggerRect = getRect(this.triggerRef)
  const windowDimensions = calculateDimensions()

  const verticalPosition = this.getVerticalPosition(triggerRect, windowDimensions)
  const horizontalPosition = this.getHorizontalPosition(triggerRect, windowDimensions)

  this.setState(activateDropdown(this.state, verticalPosition, horizontalPosition))
}

export function disable () {
  this.triggerRef.current.focus()
  this.setState(initialState)
}

export function handleEsc (e) {
  if (this.state.active && e.key === 'Escape') {
    this.disable()
  }
}

const checkIfPositionInsideRect = (position, rect) =>
  (position.x > rect.left) &&
  (position.x < rect.right) &&
  (position.y > rect.top) &&
  (position.y < rect.bottom)

export function handleClickOutside (e) {
  const active = this.state.active
  const rootRect = this.rootRef.current.getBoundingClientRect()
  const dropdownRect = this.dropdownRef.current.getBoundingClientRect()

  const clickPos = {
    x: e.clientX,
    y: e.clientY
  }

  const clickIsOutside =
    !checkIfPositionInsideRect(clickPos, rootRect) &&
    !checkIfPositionInsideRect(clickPos, dropdownRect)


  if (active && clickIsOutside) {
    this.disable()
  }
}

export function enhanceChildren (children) {
  if (children && children.type === List) {
    const originalProps = children.props
    return (
      <List
        { ...originalProps }
        onChange={ e => {
          setTimeout(this.disable, 100)
          originalProps.onChange(e)
        }}
      />
    )
  } else {
    return children || ""
  }
}
