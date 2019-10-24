import React from 'react'
import styles from './styles.module.css'
import { ReactComponent as Close } from './assets/close.svg'
import { ReactComponent as Back } from './assets/back.svg'

export default props => props.editing ? (
  <Back className={ styles.icon } />
) : (
  <Close className={ styles.icon } />
)
