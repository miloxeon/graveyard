Object.keys(window).forEach(key => {
  const prop = window[key]

  if (typeof prop === 'function') {

    const spy = function () {
      const args = Array.prototype.slice.call(arguments)
      console.log(prop.toString(), args)
      return prop.apply(this, args)
    }

    window[key] = spy
  }
})

const sneak = (start, spy) => {
  let queue = []
  let darkness = [start]

  const isObject = prop => {
    const type = typeof prop
    return type === 'function' || type === 'object' && !!prop
  }

  const isFunction = prop => typeof prop === 'function'

  while (darkness.length > 0) {
  console.log(darkness)
    const node = darkness.pop()
    if (isObject(node)) {
      darkness = Object.values(node).filter(prop => isObject(prop) || isFunction(prop)).concat(darkness)
    } else if (isFunction(node)) {
      queue.shift(node)
    }
  }
}

sneak(window, original => {
  return function () {
    const args = Array.prototype.slice.call(arguments)
    console.log(original.toString(), args)
    return original.apply(this, args)
  }
})


Object.keys(window).forEach(key => {
  const prop = window[key]

  if (typeof prop === 'function') {

    const spy = function () {
      const args = Array.prototype.slice.call(arguments)
      for (let i = 0; i < 100000; i++) { let a = 2 + 2 }
      return prop.apply(this, args)
    }

    window[key] = spy
  }
})

