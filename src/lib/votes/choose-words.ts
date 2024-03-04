import type { Word } from "$lib/domain"
import { weightedRandom } from "./weighted-random"

export function chooseWords(words: readonly Word[], numberOfWords: number): readonly Word[] {
	if (words.length <= numberOfWords) return [...words]

	const weights = words.map((word) => word.tally + 1)
	const chosenWords: Word[] = []

	while (chosenWords.length < numberOfWords) {
		const index = weightedRandom(normalizeWeights(weights))
		if (index === -1) break

		chosenWords.push(words[index])
		weights[index] = 0
	}

	return chosenWords
}

function normalizeWeights(weights: number[]): number[] {
	const sum = weights.reduce((sum, weight) => sum + weight, 0)
	return weights.map((weight) => weight / sum)
}
