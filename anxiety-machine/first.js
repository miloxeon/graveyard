const blend = (a, b, factor) => {
	const aPart = a * factor
	const bPart = b * (1 - factor)
	return aPart + bPart
}

const advancedPow = (num, pow) => {
	const calm = Math.abs(num)
	const irritated = Math.pow(num, 2)
	return blend(irritated, calm, pow)
}

const compensate = (balance, irritability) => {
	const compFactor = advancedPow(balance, irritability / 100)
	const compFactorCivil = compFactor
	const direction = balance > 0 ? -1 : 1
	return direction * compFactorCivil
}

const runtime = (balance, irritability) => {
	const balanceCivil = Math.abs(parseFloat(balance.toFixed(4)))
	if (balanceCivil < 0.01) return 0
	return balance + compensate(balance, irritability)
}

// const kick = power => {
// 	g_balance += power * Math.random()
// }

// const start = () => {
// 	let balance = 50
// 	const irritability = 10
// 	setInterval(() => {
// 		console.log(balance)
// 		balance = runtime(balance, irritability)
// 	}, 500)
// }

const calculateRunaway = (balance, irritability, iterationCount = 100) => {
	let balanceLocal = balance
	const log = []
	for (let i = 0; i < iterationCount; i++) {
		balanceLocal = runtime(balanceLocal, irritability)
		log.push(balanceLocal)
	}

	const isStable = log.includes(0)
	const stableAfter = isStable ? new Set(log).size : null

	return { isStable, stableAfter }
}

const stats = []
const balanceSpan = [1, 100]
const irritabilitySpan = [1, 20]

for (let b = balanceSpan[0]; b < balanceSpan[1]; b++) {
	for (let i = irritabilitySpan[0]; i < irritabilitySpan[1]; i++) {
		if (!stats[b - 1]) stats[b - 1] = []
		const { isStable, stableAfter } = calculateRunaway(b, i)
		stats[b - 1][i - 1] = isStable ? stableAfter : 'n'
	}
}

stats.forEach(line => {
	const str = line.join(' ')
	console.log(str)
})

// console.log(stats)

// start()

// console.log(calculateRunaway(24, 3))
