// open editor and fill it with date and optional time that come from slot

export default (state, action) => state.mergeDeep({
  newPost: {
    date: action.payload.date,
    time: action.payload.time
  }
}).set('editorOpened', true)
