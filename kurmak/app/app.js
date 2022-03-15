const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';
const openModalButton = document.getElementById('open-modal')
const closeModalButton = document.getElementById('close-modal')
const modal = document.querySelector('[role="dialog"]')

let isModalShown = modal.getAttribute('hidden') === null
let restoreScroll
let untrapFocus

const openModal = () => {
    if (isModalShown) return
    modal.removeAttribute('hidden')
    restoreScroll = preventScroll()
    untrapFocus = trapFocus()
    isModalShown = true
}

const closeModal = () => {
    if (!isModalShown) return
    modal.setAttribute('hidden', true)
    if (restoreScroll) restoreScroll()
    if (untrapFocus) untrapFocus()
    isModalShown = false
}

const preventScroll = () => {
    const initialPosition = document.documentElement.style.position
    const initialTop = document.documentElement.style.top
    const initialScrollY = window.scrollY
    document.documentElement.style.top = `-${initialScrollY}px`;
    document.documentElement.style.position = 'fixed';

    return () => {
        document.documentElement.style.position = initialPosition;
        document.documentElement.style.top = initialTop;
        window.scrollTo(0, initialScrollY)
    }
}

const trapFocus = () => {
    const wasInFocus = document.activeElement
    const interactiveElements = Array.from(modal.querySelectorAll(focusableElementsString))
    const interactiveElementsCount = interactiveElements.length
    const firstElement = interactiveElements[0]
    const lastElement = interactiveElements[interactiveElementsCount - 1]
    firstElement.focus()

    const keydownHandler = e => {
        const isTab = e.code === 'Tab' && !e.shiftKey
        const isShiftTab = e.code === 'Tab' && e.shiftKey
        const isEsc = e.code === 'Escape'
        const isFirstElementInFocus = document.activeElement === firstElement
        const isLastElementInFocus = document.activeElement === lastElement

        if (isFirstElementInFocus && isShiftTab) {
            e.preventDefault()
            lastElement.focus()
            return
        }

        if (isLastElementInFocus && isTab) {
            e.preventDefault()
            firstElement.focus()
            return
        }

        if (isEsc) {
            e.preventDefault()
            closeModal()
        }
    }

    document.addEventListener('keydown', keydownHandler)

    return () => {
        if (wasInFocus) wasInFocus.focus()
        document.removeEventListener('keydown', keydownHandler)
    }
}

if (isModalShown) {
    restoreScroll = preventScroll()
    untrapFocus = trapFocus()
}

openModalButton.addEventListener('click', openModal)
closeModalButton.addEventListener('click', closeModal)
