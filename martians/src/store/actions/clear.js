import { blankPost } from '../model.js'

// clears an editor

export default (state, action) => state.set('newPost', blankPost)
