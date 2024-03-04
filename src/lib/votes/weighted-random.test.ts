import { describe, test, expect, vi, afterEach } from "vitest"
import { weightedRandom } from "./weighted-random"

describe("weighted random", () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test("no items", () => {
		expect(weightedRandom([])).toEqual(-1)
	})

	test("single item", () => {
		expect(weightedRandom([1])).toEqual(0)
	})

	test("weighted items", () => {
		const weights = [0.5, 0.25, 0.15, 0.1]

		vi.spyOn(Math, "random")
			.mockReturnValueOnce(0)
			.mockReturnValueOnce(0.1)
			.mockReturnValueOnce(0.2)
			.mockReturnValueOnce(0.3)
			.mockReturnValueOnce(0.4)
			.mockReturnValueOnce(0.5)
			.mockReturnValueOnce(0.6)
			.mockReturnValueOnce(0.7)
			.mockReturnValueOnce(0.8)
			.mockReturnValueOnce(0.9)
			.mockReturnValueOnce(0.99)

		expect(weightedRandom(weights)).toEqual(0)
		expect(weightedRandom(weights)).toEqual(0)
		expect(weightedRandom(weights)).toEqual(0)
		expect(weightedRandom(weights)).toEqual(0)
		expect(weightedRandom(weights)).toEqual(0)
		expect(weightedRandom(weights)).toEqual(1)
		expect(weightedRandom(weights)).toEqual(1)
		expect(weightedRandom(weights)).toEqual(1)
		expect(weightedRandom(weights)).toEqual(2)
		expect(weightedRandom(weights)).toEqual(3)
		expect(weightedRandom(weights)).toEqual(3)
	})
})