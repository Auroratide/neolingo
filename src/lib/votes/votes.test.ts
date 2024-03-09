import { describe, test, expect, beforeEach } from "vitest"
import votes from "./votes.svelte"
import { withDb } from "$test/withDb"
import type { Prompt, PromptId } from "$lib/domain"
import * as Api from "$lib/api"

describe("votes", withDb((db) => {
	let prompt: Prompt

	beforeEach(async () => {
		prompt = await db.setupPrompt({ letters: 1 })

		await setupVotes(prompt.id)
	})

	describe("replaceWord", () => {
		beforeEach(async () => {
			await votes.allWords

			expect(votes.votableWords.length).toBeGreaterThan(0)
		})

		test("replacing a word", async () => {
			const [wordToReplace, ...otherWords] = votes.votableWords

			await votes.replaceWord(0)

			expect(votes.votableWords[0]).not.toEqual(wordToReplace)
			expect(votes.votableWords.slice(1)).toEqual(otherWords)
		})
	})
}))

async function setupVotes(promptId: PromptId) {
	const [
		alice,
		byakuren,
		cirno,
		doremy,
		eirin,
		flandre,
	] = await Promise.all([
		Api.generateMyId(),
		Api.generateMyId(),
		Api.generateMyId(),
		Api.generateMyId(),
		Api.generateMyId(),
		Api.generateMyId(),
	])

	await Promise.all([
		Api.submitWord(alice, promptId, "a"),
		Api.submitWord(byakuren, promptId, "b"),
		Api.submitWord(cirno, promptId, "c"),
		Api.submitWord(doremy, promptId, "d"),
		Api.submitWord(eirin, promptId, "e"),
		Api.submitWord(flandre, promptId, "f"),
	])
}