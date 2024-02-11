import React from 'react'
import styles from './styles.module.css'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import arrayMove from 'array-move'

import Slide from '../slide'
import Grid from '../grid'

interface Indexes {
  oldIndex: number
  newIndex: number
}

interface SortableItemProps {
  value: number
}

interface SortableListProps {
  items: number[]
}

const SortableItem = SortableElement((props: SortableItemProps) => (
  <Slide number={props.value} />
))

const SortableList = SortableContainer((props: SortableListProps) => {
  return (
    <div>
      {props.items.map((value: number, index: number) => (
        <SortableItem
          key={`item-${value}-${index}`}
          index={index}
          value={value}
        />
      ))}
    </div>
  )
})

export default React.memo(() => {
  const [state, setState] = React.useState<number[]>([])

  const onSortEnd = ({ oldIndex, newIndex }: Indexes) => {
    setState(state => arrayMove(state, oldIndex, newIndex))
  }

  const onPick = (value: number) => setState(state => state.concat([value]))

  return (
    <div className={styles.root}>
      <SortableList items={state} onSortEnd={onSortEnd} />
      <Grid onPick={onPick} />
    </div>
  )
})
