import React from 'react'
import styles from './styles.module.css'
import Card from '../Card'
import Slot from '../Slot'
import Mole from '../Mole'

import slots from './slots.json'

import { wrapPosts } from './logic.js'

const createPostWrapper = globals => post => post.slot ? (
  <Mole
    type="subtle"
    key={ post.id }
    mobile={ globals.mobile }
    onClick={ () => globals.actions.add(post.time, globals.date) }
  >
    <Slot
      time={ post.time }
      label={ post.text }
      mobile={ globals.mobile }
    />
  </Mole>
) : (
  <Mole
    type="opaque"
    key={ post.id }
    mobile={ globals.mobile }
    onClick={ () => globals.actions.preview(post.id) }
  >
    <Card
      time={ post.time }
      avatar={ globals.avatar }
      mobile={ globals.mobile }
      published={ post.published }
      targets={ post.targets }
    >
      { post.text }
    </Card>
  </Mole>
)

const getRootStyles = mobile => [
  styles.root,
  mobile ? styles.mobile : ''
].join(' ')

export default props => (
  <div className={ getRootStyles(props.mobile) }>
    { wrapPosts(createPostWrapper, props.posts || [], slots, {
        mobile: props.mobile,
        preview: props.preview,
        actions: props.actions,
        avatar: props.avatar,
        date: props.date
    }) }
  </div>
)
