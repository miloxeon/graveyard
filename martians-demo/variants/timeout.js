console.log('JSON received')
const root = document.getElementById('root')

const observer = new MutationObserver(() => {
  document.getElementById('preloader').style.display = 'none'
  observer.disconnect()
})

observer.observe(root, {
  childList: true
})

Object.keys(bigJSON).forEach(key => {
  setTimeout(() => {
    const textNode = document.createTextNode(bigJSON[key])
    const p = document.createElement('span')
    p.appendChild(textNode)
    root.appendChild(p)
  }, 20)
})
