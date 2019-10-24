const prettyToMinutes = pretty => {
  const tuple = pretty.split(':')
  return parseInt(tuple[0] * 60 + tuple[1])
}

const now = () => new Date().toISOString().split('T')[1].split(':').slice(0, 2).join(':')
const today = () => new Date().toISOString().split('T')[0]

const later = (a, b) => prettyToMinutes(a) - prettyToMinutes(b)

const modelizeSlot = (slot, index) => ({
  slot: true,
  id: 'key_slot' + index,
  time: slot,
  text: 'Slot ' + (index + 1)
})

const createSlotsFilter = posts => slot => {
  const slotTimePassed = later(slot.time, now()) <= 0
  const isToday = posts[0].date === today()

  if (isToday && slotTimePassed) {
    return false
  }

  for (let i in posts) {
    const post = posts[i]
    const minutes = prettyToMinutes(post.time)
    const sooner = minutes - 30
    const later = minutes + 30
    const slotMinutes = prettyToMinutes(slot.time)

    if (slotMinutes > sooner && slotMinutes < later) {
      return false
    }
  }

  return true
}

export const wrapPosts = (wrapperCreator, posts, slots, globals) => posts
  .concat(slots.map(modelizeSlot).filter(createSlotsFilter(posts)))
  .sort((a, b) => later(a.time, b.time))
  .concat({
    slot: true,
    // time: now(),
    id: 'key_slot_last'
  })
  .map(wrapperCreator(globals))
