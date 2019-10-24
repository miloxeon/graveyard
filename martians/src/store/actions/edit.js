import { fromJS } from 'immutable'

// load given post to the editor

export default (state, action) => state.set('newPost',
  fromJS(state.get('posts').toJS().filter(
    post => post.id === action.payload
  )[0])
).set('editorOpened', true)
