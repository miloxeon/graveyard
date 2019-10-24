import { setIn, fromJS } from 'immutable'

// toggle the new post sharing target

const remove = (arr, value) => arr.filter(item => item !== value)
const add = (arr, value) => [value, ...arr]
const toggle = (arr, value) => arr.includes(value) ?
  remove(arr, value) :
  add(arr, value)


export default (state, action) => setIn(state,
  ['newPost', 'targets'],
  fromJS(toggle(state.get('newPost').get('targets').toJS(), action.payload))
)
