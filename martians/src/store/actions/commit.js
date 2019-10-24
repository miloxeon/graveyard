import { setIn } from 'immutable'

// when editing, set post field on path to given value

export default (state, action) => setIn(state,
  ['newPost', action.payload.path],
  action.payload.value
)
