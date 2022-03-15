window.onload = () => {
  Array.prototype.slice.call(document.querySelectorAll('*')).filter(node => 
    node.tagName.split('-').length === 2
  ).forEach(node => node.style.display = 'none')
}
