import { all, takeLatest, call, put, select, delay } from 'redux-saga/effects'


function* saveScrollPosition () {
  const scrollPosition = (
    window.pageYOffset || document.documentElement.scrollTop
  ) - (document.documentElement.clientTop || 0)

  yield put({
    type: 'write_scroll_position',
    payload: scrollPosition
  })

  yield call(window.scrollTo, 0, 0)
}

function* restoreScrollPosition () {
  const scrollPosition = yield select(state => state.get('scrollPosition'))
  yield delay(20)
  yield call(window.scrollTo, 0, scrollPosition)
  yield put({
    type: 'reset_scroll_position'
  })
}

export default function* () {
  yield all([
    takeLatest('edit', saveScrollPosition),
    takeLatest('add', saveScrollPosition),
    takeLatest('preview', saveScrollPosition),
    takeLatest('back', restoreScrollPosition),
    takeLatest('close', restoreScrollPosition)
  ])
}
