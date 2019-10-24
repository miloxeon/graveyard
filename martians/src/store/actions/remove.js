import { fromJS } from 'immutable'

// remove post

export default (state, action) => state.set('posts',
  fromJS(state
    .get('posts')
    .toJS()
    .filter(
      post => post.id !== action.payload
    )
  )
).set('preview', null)
