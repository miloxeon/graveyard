import React from 'react'
import { ReactComponent as Close } from './assets/close.svg'
import { ReactComponent as Edit } from './assets/edit.svg'
import { ReactComponent as Remove } from './assets/remove.svg'

import styles from './styles.module.css'

export default props => props.published ? (
  <div className={ styles.actions }>
    <button
      type="button"
      className={ styles.action }
      onClick={ props.close }
      title="Close"
    >
      Close
      <Close className={ styles.icon } />
    </button>
  </div>
) : (
  <div className={ styles.actions }>
    <button
      type="button"
      className={ styles.action }
      onClick={ props.remove }
      title="Remove"
    >
      Remove
      <Remove className={ styles.icon } />
    </button>
    <button
      type="button"
      className={ styles.action }
      onClick={ props.edit }
      title="Edit"
    >
      Edit
      <Edit className={ styles.icon } />
    </button>
    <button
      type="button"
      className={ styles.action }
      onClick={ props.close }
      title="Close"
    >
      Close
      <Close className={ styles.icon } />
    </button>
  </div>
)
