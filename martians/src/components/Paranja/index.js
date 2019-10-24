import React from 'react'
import styles from './styles.module.css'

const getRootStyles = (mobile, hidden) => [
  styles.root,
  mobile ? styles.mobile : '',
  hidden ? styles.hidden : ''
].join(' ')

const getPearlStyles = (mobile, hidden) => [
  styles.pearl,
  mobile ? styles.mobile : '',
  hidden ? styles.hidden : ''
].join(' ')

export default props => (
  <div className={ getRootStyles(props.mobile, props.hidden) }>
    <div className={ getPearlStyles(props.mobile, props.hidden)}>
      { props.children }
    </div>
  </div>
)
