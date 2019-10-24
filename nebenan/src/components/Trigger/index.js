import React, { Component } from 'react'
import { ReactComponent as Expand } from './expand.svg'
import decide from 'decider'
import styles from './styles.module.css'

class Trigger extends Component {
  render () {
    const trigger = this.props.trigger || 'Open'
    if (typeof trigger === 'string') {
      return (
        <button
          className={ styles.root }
          ref={ this.props.innerRef }
          onClick={ this.props.toggle }
        >
          { trigger }
          <Expand className={ decide(styles, {
            icon: true,
            flip: this.props.isOpen
          })} />
        </button>
      )
    } else {
      const TriggerComponent = trigger
      return (
        <TriggerComponent { ...this.props } />
      )
    }
  }
}

export default Trigger
