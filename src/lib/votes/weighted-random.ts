/**
 * @param items [0.8, 0.15, 0.05] ~ weights that sum to 1
 * @returns index of the randomly chosen item
 */
export function weightedRandom(items: number[]): number {
	if (items.length === 0) return -1

	const random = Math.random()
	let sum = 0
	for (let i = 0; i < items.length; i++) {
		sum += items[i]
		if (random < sum) return i
	}

	return -1
}