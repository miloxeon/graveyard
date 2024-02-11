import React from 'react'
import styles from './styles.module.css'

interface Props {
  number: number
  onClick?: () => void
}

export default React.memo((props: Props) => {
  return (
    <div className={styles.root} onClick={props.onClick}>
      {props.number}
    </div>
  )
})
