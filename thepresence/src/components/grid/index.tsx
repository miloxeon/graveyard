import React from 'react'
import styles from './styles.module.css'

import Slide from '../slide'

interface Props {
  onPick: (number: number) => void
}

export default React.memo((props: Props) => {
  const array = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
  ]

  return (
    <div className={styles.root}>
      {array.map(value => (
        <div className={styles.item} key={`slide-${value}`}>
          <Slide number={value} onClick={() => props.onPick(value)} />
        </div>
      ))}
    </div>
  )
})
