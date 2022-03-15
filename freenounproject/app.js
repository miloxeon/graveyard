const iconSelector = '.iconPreview.no-attribution'
const getIcon = () => getComputedStyle(document.querySelector(iconSelector)).backgroundImage.slice(5, -2)
const getIconName = () => document.querySelector('.main-term').innerHTML.replace('&nbsp;', '')

const downloadIcon = () => {
    const link = document.createElement('a')
    link.setAttribute('href', getIcon())
    link.setAttribute('download', getIconName())
    link.click()
}

const interval = setInterval(() => {
    const button = document.querySelector('button.download-flow-start-button')
    const icon = document.querySelector('.iconPreview.no-attribution')

    if (button && icon) {
        clearInterval(interval)

        const clone = button.cloneNode(true)
        button.parentNode.replaceChild(clone, button)
        clone.style.background = '#fa7268'
        clone.innerHTML = 'I\'m in'
        clone.addEventListener('click', downloadIcon)
    }
}, 200)
