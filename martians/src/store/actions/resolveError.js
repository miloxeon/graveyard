import { setIn } from 'immutable'

// mark a particular error as resolved

export default (state, action) => setIn(state, ['errors', 'editor', action.payload], null)
