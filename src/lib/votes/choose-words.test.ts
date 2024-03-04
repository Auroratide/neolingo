import { describe, test, expect, afterEach, vi } from "vitest"
import { chooseWords } from "./choose-words"
import type { Word } from "$lib/domain"

describe("choose words", () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test("no words", () => {
		expect(chooseWords([], 3)).toEqual([])
	})

	test("fewer words than requested", () => {
		const words = [word("alice", 1)]
		expect(chooseWords(words, 3)).toEqual(words)
	})

	test("more words than requested", () => {
		const words = [
			word("alice", 4),     // 0.100; 0.147; 0.238
			word("byakuren", 12), // 0.260; 0.382; 0.000
			word("cirno", 6),     // 0.140; 0.206;	0.333
			word("doremy", 15),   // 0.320; 0.000; 0.000
			word("eirin", 8),     // 0.180; 0.265;	0.429
		]

		vi.spyOn(Math, "random")
			.mockReturnValueOnce(0.51)
			.mockReturnValueOnce(0.51) // same word not selected twice twice
			.mockReturnValueOnce(0.1)

		expect(chooseWords(words, 3)).toEqual([
			word("doremy", 15),
			word("byakuren", 12),
			word("alice", 4),
		])
	})

	test("some words have 0 tally", () => {
		// 1 is added to each vote so 0s always have a chance of selection
		const words = [
			word("alice", 0),    // 0.071
			word("byakuren", 0), // 0.071
			word("cirno", 9),    // 0.714
			word("doremy", 0),   // 0.071
			word("eirin", 0),    // 0.071
		]

		vi.spyOn(Math, "random")
			.mockReturnValueOnce(0.1)

		expect(chooseWords(words, 1)).toEqual([
			word("byakuren", 0),
		])
	})
})

function word(id: string, tally: number): Word {
	return { id, text: "word", tally }
}
