import React from 'react'
import Stats from '../Stats'
import styles from './styles.module.css'

const getRootStyles = mobile => [
  styles.root,
  mobile ? styles.mobile : ''
].join(' ')

export default props => (
  <div className={ getRootStyles(props.mobile) }>
    <header className={ styles.header }>
      <div className={ styles.left }>
        <h2 className={ styles.heading }>
          { props.heading }
        </h2>
        <small className={ styles.day }>
          { props.day }
        </small>
      </div>
      <div className={ styles.stats }>
        <Stats data={ props.stats } />
      </div>
    </header>
    <div className={ styles.content }>
      { props.children }
    </div>
  </div>
)
