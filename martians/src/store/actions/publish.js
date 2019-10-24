import { fromJS } from 'immutable'

// "publish" posts whose are older than current time. Should be dispatched once a minute

const now = () => new Date().toISOString().split('T')[1].split(':').slice(0, 2).join(':')
const today = () => new Date().toISOString().split('T')[0]

const dateToDays = tuple => parseInt((tuple[0] * 12 * 30) + (tuple[1] * 30) + tuple[2])
const timeToMinutes = tuple => parseInt((tuple[0] * 60) + tuple[1])

const laterDate = (a, b) => {
  const daysA = dateToDays(a.split('-'))
  const daysB = dateToDays(b.split('-'))
  return daysA > daysB
}

const laterTime = (a, b) => {
  const minutesA = timeToMinutes(a.split(':'))
  const minutesB = timeToMinutes(b.split(':'))
  return minutesA > minutesB
}

const shouldAlreadyBePublished = (date, time) =>
  laterDate(today(), date) ||
  (date === today() && laterTime(now(), time))

const publishOldPosts = post => shouldAlreadyBePublished(post.date, post.time) ?
  Object.assign({}, post, { published: true }) :
  post

export default (state, action) => state.set('posts',
  fromJS(state.get('posts').toJS().map(publishOldPosts))
)
