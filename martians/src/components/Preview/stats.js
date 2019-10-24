import React from 'react'
import styles from './styles.module.css'

import { ReactComponent as Comments } from './assets/comments.svg'
import { ReactComponent as Likes } from './assets/likes.svg'
import { ReactComponent as Reposts } from './assets/reposts.svg'
import { ReactComponent as Views } from './assets/views.svg'

const statsIcons = {
  comments: Comments,
  likes: Likes,
  reposts: Reposts,
  views: Views
}

const Stat = props => {
  const Icon = statsIcons[props.type]

  return (
    <div
      className={ styles.stat }
      title={ props.type }
    >
      <Icon />
      <span className={ styles.label }>
        { props.value }
      </span>
    </div>
  )
}

export default props => (
  <div
    className={ styles.stats }
    hidden={ props.hidden}
  >
    <Stat type="views" value={ props.views } />
    <Stat type="reposts" value={ props.reposts } />
    <Stat type="likes" value={ props.likes } />
    <Stat type="comments" value={ props.comments } />
  </div>
)
