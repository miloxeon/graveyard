import React from 'react'
import styles from './styles.module.css'
import { Icon } from '../Icon'

export default props => (
  <div className={ styles.target }>
    <input
      type="checkbox"
      id={ props.name }
      name={ props.name }
      className={ styles.checkbox }
      checked={ props.targets.includes(props.name) }
      onChange={ () => props.handler(props.name) }
    />
    <label
      className={ [styles.avatar, styles[props.name]].join(' ') }
      htmlFor={ props.name }
    >
      <img
        className={ styles.avatar_picture }
        src={ props.avatar }
        alt={ `Post to ${ props.name }` }
        title={ `Post to ${ props.name }` }
      />
      <Icon
        colorful="true"
        small="true"
        brand={ props.name }
      />
    </label>
  </div>
)
