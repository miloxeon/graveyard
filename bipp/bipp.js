const init = () => {

	let curX
	let curY
	let stopSyncing

	const getCursorPosition = e => {
		curX = e.clientX
		curY = e.clientY
	}

	const isTable = elem =>
		elem.tagName?.toLowerCase() === 'table' &&
		elem.classList.contains('sticky')

	const getTableByChild = child => {
		if (!child || !child.tagName) return
		return isTable(child) ? child : getTableByChild(child.parentElement)
	}

	const syncTableElementsScroll = table => {
		const tbody = table.querySelector('tbody')
		const thead = table.querySelector('thead')
		if (!thead || !tbody) return

		const tableRect = table.getBoundingClientRect()
		const tableStartX = tableRect.left
		const tableEndX = tableStartX + tableRect.width
		const tableStartY = tableRect.top
		const tableEndY = tableStartY + tableRect.height
		const isCursorInsideX = curX > tableStartX && curX < tableEndX
		const isCursorInsideY = curY > tableStartY && curY < tableEndY
		const isDummy = (curX === undefined && curY === undefined) || (curX === 0 && curY === 0)
		const isCursorInside = (isCursorInsideX && isCursorInsideY) || isDummy

		console.log(tableRect, curX, curY)

		if (!isCursorInside) return

		let currentScrollX = tbody.scrollLeft

		const syncScroll = element => e => {
			const scrollLeft = e.target.scrollLeft
			if (currentScrollX === scrollLeft) return
			currentScrollX = scrollLeft
			element.scrollTo(currentScrollX, 0)
		}

		const syncThead = syncScroll(thead)
		const syncTbody = syncScroll(tbody)

		tbody.addEventListener('scroll', syncThead)
		thead.addEventListener('scroll', syncTbody)

		return () => {
			tbody.removeEventListener('scroll', syncThead)
			thead.removeEventListener('scroll', syncTbody)
		}
	}

	const interceptHoveredTable = e => {
		const root = e.target
		if (!isTable(root)) return
		console.log('intercepted', root)
		if (stopSyncing) stopSyncing()
		stopSyncing = syncTableElementsScroll(root)
	}

	window.addEventListener('transitionstart', interceptHoveredTable)
	window.addEventListener('mousemove', getCursorPosition)

	window.addEventListener('touchstart', e => {
		const table = getTableByChild(e.target)
		console.log(e.target, table)
		if (stopSyncing) stopSyncing()
		stopSyncing = syncTableElementsScroll(table)
	})

	return () => {
		window.removeEventListener('transitionstart', interceptHoveredTable)
		window.removeEventListener('mousemove', getCursorPosition)
	}
}

init()
