import React from 'react'

import { ReactComponent as Comments } from './assets/comments.svg'
import { ReactComponent as Likes } from './assets/likes.svg'
import { ReactComponent as Reposts } from './assets/reposts.svg'
import { ReactComponent as Views } from './assets/views.svg'

const icons = {
  comments: Comments,
  likes: Likes,
  reposts: Reposts,
  views: Views
}

export default props => {
  const Icon = icons[props.type]
  return (<Icon { ...props } />)
}
