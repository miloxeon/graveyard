import React from 'react'
import styles from './styles.module.css'

const getRootStyles = (mobile, type) => [
  styles.root,
  mobile ? styles.mobile : '',
  styles[type]
].join(' ')

export default props => (
  <button
    className={ getRootStyles(props.mobile, props.type) }
    onClick={ props.onClick }
  >
    { props.children }
  </button>
)
