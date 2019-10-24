console.log('JSON received')
const root = document.getElementById('root')

Object.keys(bigJSON).forEach(key => {
  const textNode = document.createTextNode(bigJSON[key])
  const p = document.createElement('span')
  p.appendChild(textNode)
  root.appendChild(p)
})
