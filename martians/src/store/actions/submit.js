import nanoid from 'nanoid'
import { blankPost, errors } from '../model.js'
import { fromJS, setIn, getIn } from 'immutable'

// create or update a post

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

const validateDateTime = (date, time) =>
  date &&
  time &&
  (laterDate(date, today()) || date === today()) &&
  (date === today() ? laterTime(time, now()) : true)

const validateTargets = targets => targets.length > 0

const validate = post => ({
  editor: {
    datetime: !validateDateTime(post.date, post.time) ? 'Posting time should be in the future' : null,
    targets: !validateTargets(post.targets) ? 'Select at least one social media to post to' : null
  }
})

const create = (state, action) => setIn(
  state,
  ['posts'],
  fromJS(getIn(state, ['posts']).toJS().concat(
    Object.assign({},
      getIn(state, ['newPost']).toJS(), {
        id: nanoid(),
        text: getIn(state, ['newPost', 'text']).trim()
      }
    )
  ))
).set('newPost', blankPost)
.set('editorOpened', false)
.set('errors', errors)

const update = (state, action) => setIn(
  state,
  ['posts'],
  fromJS(
    getIn(state, ['posts']).toJS()
      .filter(post => post.id !== getIn(state, ['newPost', 'id']))
      .concat([getIn(state, ['newPost']).toJS()])
  )
).set('newPost', blankPost)
.set('editorOpened', false)
.set('errors', errors)

const createOrUpdate = (state, action) => typeof getIn(state, ['newPost', 'id']) === 'undefined' ?
  create(state, action) :
  update(state, action)

const correct = validationResult =>
  !(validationResult.editor.datetime ||
    validationResult.editor.targets)

export default (state, action) => {
  const post = state.get('newPost').toJS()
  const validationResult = validate(post)

  return correct(validationResult) ? createOrUpdate(state, action) : state.set('errors', fromJS(validationResult))
}
