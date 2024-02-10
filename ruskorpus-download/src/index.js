import download from './download'
import htmlify from './htmlify'

const start = () => {

    const list = Array.from(document.querySelectorAll('.pager ~ ol > li'))
    const pageNumber = document.querySelector('.pager > b').textContent.trim()
    const word = document.querySelector('p.res:nth-child(2n)').textContent.trim().replaceAll(`"`, ``)

    const pollute = () => {
        const style = document.createElement('style')
        style.innerHTML = `
            .content.narrow {
                max-width: 50rem;
                margin: 0 auto;
            }

            .pager ~ ol ul {
                padding-left: 0;
            }

            .pager ~ ol li table td:first-child {
                display: flex;
            }

            .rkd {
                position: sticky;
                top: 1rem;
                left: 1rem;
                display: inline-flex;
                background: white;
                padding: 1rem;
                border: 1px solid rgba(0, 0, 0, .5);
                border-radius: 5px;
                font-family: sans-serif;
                font-size: small;
            }

            .rkd-checkbox {
                width: 20px;
                height: 20px;
            }

            .rkd button {
                cursor: pointer;
            }

            #rkd-download {
                margin-right: 1rem;
            }

            #rkd-download:disabled {
                cursor: help;
            }

            #rkd-narrow {
                margin-left: 1rem;
            }
        `
        document.head.appendChild(style)

        const rkd = document.createElement('div')
        rkd.classList.add('rkd')
        rkd.innerHTML = `
            <button type="button" id="rkd-download"></button>

            <span>
                <button type="button" id="rkd-all">
                    Выделить все
                </button>
                <button type="button" id="rkd-none">
                    Снять выделение
                </button>
                <label>
                    <input type="checkbox" id="rkd-narrow">
                    Узкая страница
                </label>
            </span>
        `
        const pager = document.querySelector('.pager')
        const pagerParent = pager.parentNode
        pagerParent.insertBefore(rkd, pager.nextSibling)

        list.forEach(elem => {
            const tr = elem.querySelector('tr')
            const firstTd = tr.firstChild
            const checkbox = document.createElement('input')
            checkbox.setAttribute('type', 'checkbox')
            checkbox.setAttribute('title', 'Скачать этот пример')
            checkbox.classList.add('rkd-checkbox')
            const td = document.createElement('td')
            td.appendChild(checkbox)
            tr.insertBefore(td, firstTd)
        })
    }

    const manageButtonState = () => {
        const button = document.getElementById('rkd-download')
        const checkboxes = Array.from(document.querySelectorAll('.rkd-checkbox'))
        const checked = checkboxes.filter(checkbox => checkbox.checked)
        if (checked.length === 0) {
            button.setAttribute('disabled', 'disabled')
            button.innerHTML = 'Нечего скачивать'
            button.setAttribute('title', 'Выберите примеры, которые хотите скачать')
        } else {
            button.removeAttribute('title')
            button.removeAttribute('disabled')
            button.innerHTML = '⬇ Скачать выбранное'
        }
    }

    const manageNarrow = () => {
        const ls = window.localStorage.getItem('rkd-narrow')
        const narrow = document.getElementById('rkd-narrow')
        const checked = ls === 'true'
        narrow.checked = checked
        document.querySelector('.content').classList.toggle('narrow', checked)
    }

    const onNarrow = e => {
        window.localStorage.setItem('rkd-narrow', e.target.checked ? 'true' : 'false')
        document.querySelector('.content').classList.toggle('narrow', e.target.checked)
    }

    const shouldAlert = () => {
        const checkboxes = Array.from(document.querySelectorAll('.rkd-checkbox'))
        const checked = checkboxes.filter(checkbox => checkbox.checked)
        return checked.length > 0 && checked.length !== checkboxes.length
    }

    const selectAll = () => {
        if (shouldAlert()) {
            const result = confirm('Выделить все?')
            if (!result) return
        }
        const checkboxes = Array.from(document.querySelectorAll('.rkd-checkbox'))
        checkboxes.forEach(checkbox => checkbox.checked = true)
        manageButtonState()
    }

    const selectNone = () => {
        if (shouldAlert()) {
            const result = confirm('Снять выделение?')
            if (!result) return
        }
        const checkboxes = Array.from(document.querySelectorAll('.rkd-checkbox'))
        checkboxes.forEach(checkbox => checkbox.checked = false)
        manageButtonState()
    }

    const getResults = () => {
        const results = list
        .filter(node => {
            const checkbox = node.querySelector('.rkd-checkbox')
            return checkbox && checkbox.checked
        })
        .map(node => {
            const heading = node.querySelector('span.b-doc-expl').textContent.trim()
            const text = node.querySelector('li').textContent
                .replace('[омонимия снята]', '')
                .replace('[омонимия не снята]', '')
                .replace('←…→', '')
                .trim()
                .replaceAll(word, `<b>${word}</b>`)
            return { heading, text }
        })
    
        const resultsInnerHtml = results.map(result => `
            <li>
                <p><b>${result.heading}</b></p>
                <p>${result.text}</p>
            </li>
        `)
    
        const resultsHtml = `
            <ol>
                ${resultsInnerHtml.join('\n')}
            </ol>
        `

        return resultsHtml
    }

    const downloadFile = () => {
        const results = getResults()
        const filename = `${word} (стр. ${pageNumber}).html`
        const resultsHTML = htmlify(filename, results)
        download(resultsHTML, 'text/html', filename)
    }

    const kwic = new URLSearchParams(window.location.search).get('out') === 'kwic'
    if (kwic) return 

    pollute()
    document.getElementById('rkd-download').addEventListener('click', downloadFile)
    Array.from(document.querySelectorAll('.rkd-checkbox')).forEach(node => {
        node.addEventListener('change', manageButtonState)
    })
    manageButtonState()

    document.getElementById('rkd-all').addEventListener('click', selectAll)
    document.getElementById('rkd-none').addEventListener('click', selectNone)
    document.getElementById('rkd-narrow').addEventListener('change', onNarrow)
    manageNarrow()
}

if (document.readyState === 'interactive' || document.readyState === 'complete') {
    start()
} else {
    document.addEventListener('DOMContentLoaded', start)
}
