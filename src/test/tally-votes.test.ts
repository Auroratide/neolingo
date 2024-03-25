import { describe, test, expect, beforeEach } from "vitest"
import * as Api from "$lib/api"
import { withDb } from "./withDb"
import type { MyId, Prompt, SubmittedWord } from "$lib/domain"

describe("tally votes", withDb((db) => {
	let prompt: Prompt
	let alice: MyId
	let byakuren: MyId
	let cirno: MyId
	let doremy: MyId
	let eirin: MyId
	let flandre: MyId
	let words: readonly SubmittedWord[]

	beforeEach(async () => {
		const today = new Date()
		prompt = await db.setupPrompt({
			text: "some prompt",
			day: today,
		})

		;[alice, byakuren, cirno, doremy, eirin, flandre] = await Promise.all([
			db.setupPerson(),
			db.setupPerson(),
			db.setupPerson(),
			db.setupPerson(),
			db.setupPerson(),
			db.setupPerson(),
		])

		await Promise.all([
			Api.submitWord(alice, prompt.id, "doll"),
			Api.submitWord(byakuren, prompt.id, "motorcycle"),
			Api.submitWord(cirno, prompt.id, "strength"),
			Api.submitWord(doremy, prompt.id, "dream"),
			Api.submitWord(eirin, prompt.id, "medicine"),
			Api.submitWord(flandre, prompt.id, "vampire"),
		])

		words = await Api.getVotableWords()
	})

	test("one word is a clear winner", async () => {
		// given
		await Promise.all([
			Api.submitVote(alice, prompt.id, words[0].id),
			Api.submitVote(byakuren, prompt.id, words[0].id),
			Api.submitVote(cirno, prompt.id, words[0].id),
			Api.submitVote(doremy, prompt.id, words[1].id),
			Api.submitVote(eirin, prompt.id, words[1].id),
			Api.submitVote(flandre, prompt.id, words[2].id),
		])

		// when
		await db.query("SELECT private.tally_votes($1)", [prompt.id])

		// then
		const tallyResult = await db.query("SELECT * FROM private.words WHERE prompt_id = $1", [prompt.id])
			.then((result) => result.rows)

		expect(tallyResult.find(byId(words[0]))?.tally).toBe(3)
		expect(tallyResult.find(byId(words[1]))?.tally).toBe(2)
		expect(tallyResult.find(byId(words[2]))?.tally).toBe(1)
		expect(tallyResult.find(byId(words[3]))?.tally).toBe(0)
		expect(tallyResult.find(byId(words[4]))?.tally).toBe(0)
		expect(tallyResult.find(byId(words[5]))?.tally).toBe(0)

		// and
		const officialWord = (await Api.getDictionary())[0]
		expect(officialWord.word).toEqual(words[0].text)
	})

	test("some words tied", async () => {
		// given
		await Promise.all([
			Api.submitVote(alice, prompt.id, words[1].id),
			Api.submitVote(byakuren, prompt.id, words[1].id),
			Api.submitVote(cirno, prompt.id, words[2].id),
			Api.submitVote(doremy, prompt.id, words[2].id),
			Api.submitVote(eirin, prompt.id, words[3].id),
			Api.submitVote(flandre, prompt.id, words[3].id),
		])

		// when
		await db.query("SELECT private.tally_votes($1)", [prompt.id])

		// then
		const tallyResult = await db.query("SELECT * FROM private.words WHERE prompt_id = $1", [prompt.id])
			.then((result) => result.rows)

		expect(tallyResult.find(byId(words[0]))?.tally).toBe(0)
		expect(tallyResult.find(byId(words[1]))?.tally).toBe(2)
		expect(tallyResult.find(byId(words[2]))?.tally).toBe(2)
		expect(tallyResult.find(byId(words[3]))?.tally).toBe(2)
		expect(tallyResult.find(byId(words[4]))?.tally).toBe(0)
		expect(tallyResult.find(byId(words[5]))?.tally).toBe(0)

		// and
		const officialWord = (await Api.getDictionary())[0]
		expect([
			words[1].text,
			words[2].text,
			words[3].text,
		]).toContain(officialWord.word)
	})

	test("tallying votes for a prompt that has already been tallied", async () => {
		// given
		await Promise.all([
			Api.submitVote(alice, prompt.id, words[1].id),
			Api.submitVote(byakuren, prompt.id, words[1].id),
			Api.submitVote(cirno, prompt.id, words[2].id),
			Api.submitVote(doremy, prompt.id, words[2].id),
			Api.submitVote(eirin, prompt.id, words[3].id),
			Api.submitVote(flandre, prompt.id, words[3].id),
		])

		// when
		await db.query("SELECT private.tally_votes($1)", [prompt.id])
		const promise = db.query("SELECT private.tally_votes($1)", [prompt.id])

		// then
		await expect(promise).rejects.toThrow()
	})
}))

function byId(forWord: SubmittedWord) {
	return (row: { id: string }): boolean =>
		row.id.toString() === forWord.id
}
