// set scroll Y to some value. Called by saga

export default (state, action) => state.set('scrollPosition', action.payload)
