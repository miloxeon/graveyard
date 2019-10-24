export const today = () => new Date().toISOString().split('T')[0]

const getTomorrow = date => {
  const tuple = date.split('-')
  tuple[2]++
  return tuple.join('-')
}

export const getGroupHeading = date => {
  if (date === today()) {
    return 'Today'
  } else if (date === getTomorrow(today())) {
    return 'Tomorrow'
  } else {
    return date.toString()
  }
}

export const getGroupWeekDay = date => {
  const day = new Date(date).getDay()
  return [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ][day]
}

const sum = (a, b) => a + b

export const getStats = posts => ({
  today: {
    likes: posts.map(post => post.likes).reduce(sum),
    comments: posts.map(post => post.comments).reduce(sum),
    reposts: posts.map(post => post.reposts).reduce(sum),
    views: posts.map(post => post.views).reduce(sum)
  },
  best: {
    likes: 201,
    comments: 46,
    reposts: 12,
    views: 843
  }
})

export const splitPostsByDate = posts => {
  let groups = {}

  for (let i in posts) {
    const post = posts[i]
    if (groups[post.date]) {
      groups[post.date].push(post)
    } else {
      groups[post.date] = [post]
    }
  }

  return Object.entries(groups).map(entry => ({
    date: entry[0],
    posts: entry[1]
  }))
}
