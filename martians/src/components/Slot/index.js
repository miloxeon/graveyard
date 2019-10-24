import React from 'react'
import styles from './styles.module.css'
import plus from './assets/plus.svg'

const getRootStyles = mobile => [
  styles.root,
  mobile ? styles.mobile : ''
].join(' ')

const Img = props => (
  <img
    className={ styles.plus }
    src={ plus }
    alt=""
    aria-hidden="true"
  />
)

const NoProps = props => (
  <div
    className={ getRootStyles(props.mobile) }
    // onClick={ props.onClick }
  >
    <span className={ styles.label }>
      Schedule post
    </span>
    <Img />
  </div>
)

const TimeAndLabel = props => (
  <div
    className={ getRootStyles(props.mobile) }
    title="Schedule post on this slot"
    // onClick={ props.onClick }
  >
    <time className={ styles.time }>
      { props.time }
    </time>
    <span className={ styles.label }>
      { props.label }
    </span>
    <Img />
  </div>
)

export default props => props.time && props.label ? (
  <TimeAndLabel { ...props } />
) : (
  <NoProps { ...props } />
)
