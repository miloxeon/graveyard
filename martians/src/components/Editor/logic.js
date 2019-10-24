const timeToMinutes = time => parseInt(time.split(':')[0] * 60) + parseInt(time.split(':')[1])
const timeFromMinutes = minutes => Math.floor(minutes / 60) + ':' + (minutes - Math.floor(minutes / 60) * 60)
const later = (a, b) => timeToMinutes(a) > timeToMinutes(b)

export const today = () => new Date().toISOString().split('T')[0]

export const now = () => {
  const currentTime = new Date().toISOString().split('T')[1].split(':').slice(0, 2).join(':')
  const currentPlusTen = timeFromMinutes(timeToMinutes(currentTime) + 10)
  const _23_59 = timeFromMinutes('23:59')

  return later(currentPlusTen, _23_59) ? _23_59 : currentPlusTen
}

export const createSubmitHandler = callback => e => {
  e.preventDefault()
  callback()
}

export const createToggleTargetHandler = actions => name => {
  actions.resolveError('targets')
  return actions.toggleTarget(name)
}

export const createDateChangeHandler = actions => e => {
  actions.resolveError('datetime')
  return actions.commit('date')(e)
}

export const createTimeChangeHandler = actions => e => {
  actions.resolveError('datetime')
  return actions.commit('time')(e)
}
