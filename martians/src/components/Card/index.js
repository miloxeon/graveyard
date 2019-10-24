import React from 'react'
import styles from './styles.module.css'
import { Avatar, Icon } from '../Icon'

const getRootStyles = (mobile, published) => [
  styles.root,
  mobile ? styles.mobile : '',
  published ? styles.published : ''
].join(' ')

export default props => (
  <article
    className={ getRootStyles(props.mobile, props.published) }
    // onClick={ props.onClick }
  >
    <header className={ styles.header }>
      <time className={ styles.time }>
        { props.time }
      </time>
      <div className={ styles.pillbox_container }>
        <div className={ styles.pillbox }>
          { (props.targets || []).map(
            brand => (
              <Icon
                key={ brand }
                brand={ brand }
              />
            )
          ) }
        </div>
        <div className={ [styles.pillbox, styles.pillbox_active].join(' ') }>
          { (props.targets || []).map(
            brand => (
              <Avatar
                avatar={ props.avatar }
                key={ brand }
                brand={ brand }
              />
            )
          ) }
        </div>
      </div>
    </header>
    <span className={ styles.text }>
      { props.children }
    </span>
  </article>
)
