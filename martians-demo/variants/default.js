console.log('JSON received')
const root = document.getElementById('root')

let html = ''

for (key of Object.keys(bigJSON)) {
  html += `<span>${bigJSON[key]}</span>`
}

root.innerHTML = html
