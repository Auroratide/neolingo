import { describe, expect, test, beforeEach } from "vitest"
import * as Api from "."
import type { SubmittedWord } from "$lib/domain"
import { withDb } from "$test/withDb"

describe("api", withDb((db) => {
	test("generateMyId", async () => {
		const result1 = await Api.generateMyId()
		const result2 = await Api.generateMyId()

		expect(result1.length).toBeGreaterThan(0)
		expect(result2.length).toBeGreaterThan(0)
		expect(result1).not.toEqual(result2)
	})

	test("getPromptForToday", async () => {
		// given
		const now = new Date()
		const today = now.toISOString().split("T")[0]
		const expectedText = "PROMPT FROM TEST"
		const expectedLetters = 2

		await db.query(`
			INSERT INTO private.prompts
				(day, text, letters)
			VALUES
				($1, $2, $3)
			ON CONFLICT (day)
			DO UPDATE SET text = EXCLUDED.text, letters = EXCLUDED.letters
		`, [today, expectedText, expectedLetters])

		// when
		const result = await Api.getPromptForToday()

		// then
		expect(result.text).toEqual(expectedText)
		expect(result.letters).toEqual(expectedLetters)
	})

	describe("submitWord", () => {
		beforeEach(async () => {
			const now = new Date()
			const today = now.toISOString().split("T")[0]
			const todayText = "PROMPT FROM TEST TODAY"
			const todayLetters = 5

			await db.query(`
				INSERT INTO private.prompts
					(day, text, letters)
				VALUES
					($1, $2, $3)
				ON CONFLICT (day)
				DO UPDATE SET text = EXCLUDED.text, letters = EXCLUDED.letters
			`, [today, todayText, todayLetters])

			const yesterNow = new Date(Date.now() - 1000 * 60 * 60 * 24)
			const yesterday = yesterNow.toISOString().split("T")[0]
			const yesterText = "PROMPT FROM TEST YESTERDAY"
			const yesterLetters = 6

			await db.query(`
				INSERT INTO private.prompts
					(day, text, letters)
				VALUES
					($1, $2, $3)
				ON CONFLICT (day)
				DO UPDATE SET text = EXCLUDED.text, letters = EXCLUDED.letters
			`, [yesterday, yesterText, yesterLetters])
		})

		test("submitting a valid word for the first time", async () => {
			// given
			const myId = await Api.generateMyId()
			const prompt = await Api.getPromptForToday()

			const myWord = Array.from({ length: prompt.letters }).fill("a").join("")

			// when
			await Api.submitWord(myId, prompt.id, myWord)

			// then
			const result = await db.query(`
				SELECT * FROM private.submissions WHERE person_id = $1 AND prompt_id = $2
			`, [myId, prompt.id])
			
			expect(result.rows.length).toEqual(1)
			expect(result.rows[0].word).toEqual(myWord)
		})

		test("resubmitting a different word for the same prompt", async () => {
			// given
			const myId = await Api.generateMyId()
			const prompt = await Api.getPromptForToday()

			const myFirstWord = Array.from({ length: prompt.letters }).fill("a").join("")
			const mySecondWord = Array.from({ length: prompt.letters }).fill("z").join("")

			// when
			await Api.submitWord(myId, prompt.id, myFirstWord)
			await Api.submitWord(myId, prompt.id, mySecondWord)

			// then
			const result = await db.query(`
				SELECT * FROM private.submissions WHERE person_id = $1 AND prompt_id = $2
			`, [myId, prompt.id])

			expect(result.rows.length).toEqual(1)
			expect(result.rows[0].word).toEqual(mySecondWord)
		})

		test("word has wrong number of letters", async () => {
			// given
			const myId = await Api.generateMyId()
			const prompt = await Api.getPromptForToday()

			const tooLong = Array.from({ length: prompt.letters + 1 }).fill("a").join("")

			// when
			const promise = Api.submitWord(myId, prompt.id, tooLong)

			// then
			await expect(promise).rejects.toThrow(/word must be exactly \d+ letters long/i)
		})

		test("word has non-letters", async () => {
			// given
			const myId = await Api.generateMyId()
			const prompt = await Api.getPromptForToday()

			const nonLetters = Array.from({ length: prompt.letters }).fill("1").join("")

			// when
			const promise = Api.submitWord(myId, prompt.id, nonLetters)

			// then
			await expect(promise).rejects.toThrow(/word must contain only letters/i)
		})

		test("my id is not known", async () => {
			// given
			const missingId = "bc39e28b-0012-4c24-8a1e-233b5ff19c11"
			const prompt = await Api.getPromptForToday()

			const myWord = Array.from({ length: prompt.letters }).fill("a").join("")

			// when
			const promise = Api.submitWord(missingId, prompt.id, myWord)

			// then
			await expect(promise).rejects.toThrow(/failed to submit word/i)
		})

		test("prompt id is not known", async () => {
			// given
			const myId = await Api.generateMyId()
			const prompt = await Api.getPromptForToday()
			const missingPromptId = "-1"

			const tooLong = Array.from({ length: prompt.letters }).fill("a").join("")

			// when
			const promise = Api.submitWord(myId, missingPromptId, tooLong)

			// then
			await expect(promise).rejects.toThrow(/could not find prompt/i)
		})

		test("prompt id is for a different day", async () => {
			// given
			const yesterNow = new Date(Date.now() - 1000 * 60 * 60 * 24)
			const yesterday = yesterNow.toISOString().split("T")[0]
			const [promptId, letters] = await db.query(`
				SELECT id, letters FROM private.prompts WHERE day = $1
			`, [yesterday]).then(result => [result.rows[0].id, result.rows[0].letters])

			const myId = await Api.generateMyId()

			const myWord = Array.from({ length: letters }).fill("a").join("")

			// when
			const promise = Api.submitWord(myId, promptId, myWord)

			// then
			await expect(promise).rejects.toThrow(/word was submitted for a prompt other than today's prompt/i)
		})
	})

	describe("voting", () => {
		let promptId: string
		let alice: string
		let marisa: string
		let aya: string

		beforeEach(async () => {
			const now = new Date()
			const today = now.toISOString().split("T")[0]
			const todayText = "PROMPT FROM TEST TODAY"
			const todayLetters = 5

			await db.query(`
				INSERT INTO private.prompts
					(day, text, letters)
				VALUES
					($1, $2, $3)
				ON CONFLICT (day)
				DO UPDATE SET text = EXCLUDED.text, letters = EXCLUDED.letters
			`, [today, todayText, todayLetters])

			promptId = await db.query(`
				SELECT id FROM private.prompts WHERE day = $1;
			`, [today]).then(result => result.rows[0].id)

			;[alice, marisa, aya] = await Promise.all([Api.generateMyId(), Api.generateMyId(), Api.generateMyId()])
		})
		
		test("no words exist for the prompt yet", async () => {
			const result = await Api.getVotableWords()

			expect(result).toEqual([])
		})

		test("a few words have been submitted, but no votes yet", async () => {
			// given
			await Api.submitWord(alice, promptId, "dolls")
			await Api.submitWord(marisa, promptId, "laser")
			await Api.submitWord(aya, promptId, "tengu")

			// when
			const result = await Api.getVotableWords()

			// then
			expect(result).toEqual(expect.arrayContaining([
				expect.objectContaining({ text: "dolls" }),
				expect.objectContaining({ text: "laser" }),
				expect.objectContaining({ text: "tengu" }),
			]))
		})

		test("two people submit the same word", async () => {
			// given
			await Api.submitWord(alice, promptId, "cards")
			await Api.submitWord(marisa, promptId, "cards")

			// when
			const result = await Api.getVotableWords()

			// then
			expect(result).toEqual(expect.arrayContaining([
				expect.objectContaining({ text: "cards" }),
			]))
		})

		test("votes on words are tallied", async () => {
			// given
			await Api.submitWord(alice, promptId, "dolls")
			await Api.submitWord(marisa, promptId, "laser")
			await Api.submitWord(aya, promptId, "tengu")

			const [dolls, laser] = await Api.getVotableWords()

			// when
			await Api.submitVote(alice, promptId, laser.id)
			await Api.submitVote(marisa, promptId, dolls.id)
			await Api.submitVote(aya, promptId, laser.id)

			// then
			const tallied = await Api.getVotableWords()

			expect(tallied).toEqual(expect.arrayContaining([
				expect.objectContaining({ text: "laser", tally: 2 }),
				expect.objectContaining({ text: "dolls", tally: 1 }),
				expect.objectContaining({ text: "tengu", tally: 0 }),
			]))
		})

		test("resubmitting a vote", async () => {
			// given
			await Api.submitWord(alice, promptId, "dolls")
			await Api.submitWord(marisa, promptId, "laser")
			await Api.submitWord(aya, promptId, "tengu")

			const [dolls, laser] = await Api.getVotableWords()

			await Api.submitVote(aya, promptId, laser.id)
	
			// when
			await Api.submitVote(aya, promptId, dolls.id)

			// then
			const tallied = await Api.getVotableWords()

			expect(tallied).toEqual(expect.arrayContaining([
				expect.objectContaining({ text: "laser", tally: 0 }),
				expect.objectContaining({ text: "dolls", tally: 1 }),
				expect.objectContaining({ text: "tengu", tally: 0 }),
			]))
		})

		describe("submitVote validation", () => {
			let word: SubmittedWord

			beforeEach(async () => {
				await Api.submitWord(alice, promptId, "dolls")
				word = (await Api.getVotableWords())[0]
			})

			test("my id is not known", async () => {
				// given
				const missingId = "bc39e28b-0012-4c24-8a1e-233b5ff19c11"

				// when
				const promise = Api.submitVote(missingId, promptId, word.id)

				// then
				await expect(promise).rejects.toThrow(/failed to submit vote/i)
			})

			test("prompt id is not known", async () => {
				// given
				const missingPromptId = "-1"

				// when
				const promise = Api.submitVote(marisa, missingPromptId, word.id)

				// then
				await expect(promise).rejects.toThrow(/could not find prompt/i)
			})

			test("word id is not known", async () => {
				// given
				const missingWordId = "-1"

				// when
				const promise = Api.submitVote(marisa, promptId, missingWordId)

				// then
				await expect(promise).rejects.toThrow(/could not find word/i)
			})

			test("word id is for a different prompt", async () => {
				// given
				const todaysPromptId = promptId

				const olderPromptId = await db.query(`
					INSERT INTO private.prompts (day, text, letters)
					VALUES ('2024-02-20', 'older prompt', 6)
					RETURNING id;
				`).then(result => result.rows[0].id)

				const olderWordId = await db.query(`
					INSERT INTO private.words (prompt_id, text) VALUES ($1, 'fakest') RETURNING id;
				`, [olderPromptId]).then(result => result.rows[0].id)

				// when
				const promise = Api.submitVote(marisa, todaysPromptId, olderWordId)

				// then
				await expect(promise).rejects.toThrow(/voted word was for a different prompt/i)
			})

			test("prompt is no longer applicable for today", async () => {
				// given
				const olderPromptId = await db.query(`
					INSERT INTO private.prompts (day, text, letters)
					VALUES ('2024-02-24', 'older prompt', 6)
					RETURNING id;
				`).then(result => result.rows[0].id)

				const olderWordId = await db.query(`
					INSERT INTO private.words (prompt_id, text) VALUES ($1, 'fakest') RETURNING id;
				`, [olderPromptId]).then(result => result.rows[0].id)

				// when
				const promise = Api.submitVote(marisa, olderPromptId, olderWordId)

				// then
				await expect(promise).rejects.toThrow(/voting period for this prompt has already passed/i)
			})
		})
	})

	describe("dictionary", () => {
		beforeEach(async () => {
			const promptIds = await db.query(`
				INSERT INTO private.prompts
					(day, text, letters)
				VALUES
					('2024-02-23', 'older prompt', 6),
					('2024-02-24', 'old prompt', 6);
			`).then(result => result.rows.map((it) => it.id))

			await db.query(`
				INSERT INTO private.dictionary
					(prompt_id, word)
				VALUES
					(1, 'ancient'),
					(2, 'old');
			`, promptIds)
		})

		test("getDictioanry", async () => {
			// when
			const result = await Api.getDictionary()

			// then - ordered by date desc
			expect(result).toEqual([ {
				word: "old",
				definition: "old prompt",
				day: new Date("2024-02-24T00:00:00.000Z"),
			}, {
				word: "ancient",
				definition: "older prompt",
				day: new Date("2024-02-23T00:00:00.000Z"),
			} ])
		})

		test("getLastWord", async () => {
			// when
			const result = await Api.getLastWord()

			// then - ordered by date desc
			expect(result).toEqual({
				word: "old",
				definition: "old prompt",
				day: new Date("2024-02-24T00:00:00.000Z"),
			})
		})
	})
}))
