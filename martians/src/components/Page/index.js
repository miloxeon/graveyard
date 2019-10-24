import React from 'react'
import styles from './styles.module.css'
import { ReactComponent as Menu } from './assets/menu.svg'
import { getRootStyles, getMainStyles, getAsideStyles } from './deciders.js'

export default props => (
  <div
    className={ getRootStyles(props.mobile, props.inert) }
    inert={ props.inert ? 'true' : undefined }
  >
    <button
      className={ styles.menu }
      onClick={ props.toggleMenu }
    >
      <Menu />
    </button>
    <aside
      className={ getAsideStyles(props.mobile, props.asideOpened) }
    >
      <button
        className={ styles.menu }
        onClick={ props.toggleMenu }
      >
        <Menu className={ styles.invert } />
      </button>
      { props.aside }
    </aside>
    <main className={ getMainStyles(props.asideOpened) }>
      { props.children }
    </main>
  </div>
)
