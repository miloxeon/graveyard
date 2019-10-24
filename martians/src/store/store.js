import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { initialState } from './model.js'
import sagas from './sagas.js'

import toggleMenu from './actions/toggleMenu.js'
import preview from './actions/preview.js'
import edit from './actions/edit.js'
import close from './actions/close.js'
import back from './actions/back.js'
import add from './actions/add.js'
import submit from './actions/submit.js'
import commit from './actions/commit.js'
import toggleTarget from './actions/toggleTarget.js'
import publish from './actions/publish.js'
import remove from './actions/remove.js'
import resolveError from './actions/resolveError.js'
import writeScrollPosition from './actions/writeScrollPosition.js'
import resetScrollPosition from './actions/resetScrollPosition.js'
import clear from './actions/clear.js'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
  (state = initialState, action) => {
    switch (action.type) {
      case 'toggle_menu': return toggleMenu(state, action)
      case 'preview': return preview(state, action)
      case 'edit': return edit(state, action)
      case 'close': return close(state, action)
      case 'back': return back(state, action)
      case 'add': return add(state, action)
      case 'submit': return submit(state, action)
      case 'commit': return commit(state, action)
      case 'toggle_target': return toggleTarget(state, action)
      case 'publish': return publish(state, action)
      case 'remove': return remove(state, action)
      case 'resolve_error': return resolveError(state, action)
      case 'clear': return clear(state, action)

      case 'write_scroll_position': return writeScrollPosition(state, action)
      case 'reset_scroll_position': return resetScrollPosition(state, action)
      default: return state
    }
  },
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(sagas)
