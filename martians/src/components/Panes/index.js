import React from 'react'
import Cards from '../Cards'
import Pane from '../Pane'

import { getGroupHeading, getGroupWeekDay, today, getStats, splitPostsByDate } from './logic.js'

const createWrapper = innerProps => (group, index) => (
  <Pane
    key={ index }
    heading={ getGroupHeading(group.date) }
    day={ getGroupWeekDay(group.date) }
    mobile={ innerProps.mobile }
    stats={ group.date === today() ? getStats(group.posts) : null }
  >
    <Cards
      posts={ group.posts }
      date={ group.date }
      { ...innerProps }
    />
  </Pane>
)

export default props => (
  <div>
    { splitPostsByDate(props.posts || []).map(createWrapper({
        mobile: props.mobile,
        preview: props.preview,
        actions: props.actions,
        avatar: props.avatar
    })) }
  </div>
)
