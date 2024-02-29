import { describe, expect, test, beforeAll, afterAll, beforeEach } from "vitest"
import { Client } from "pg"
import * as Api from "."

describe("api", () => {
	const { VITE_LOCAL_PG_URL } = import.meta.env
	let pg: Client

	beforeAll(async () => {
		pg = new Client(VITE_LOCAL_PG_URL)
		await pg.connect()
	})

	afterAll(async () => {
		await pg.end()
	})

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

		await pg.query(`
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

			await pg.query(`
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

			await pg.query(`
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
			const result = await pg.query(`
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
			const result = await pg.query(`
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
			const [promptId, letters] = await pg.query(`
				SELECT id, letters FROM private.prompts WHERE day = $1
			`, [yesterday]).then(result => [result.rows[0].id, result.rows[0].letters])

			const myId = await Api.generateMyId()

			const myWord = Array.from({ length: letters }).fill("a").join("")

			// when
			const promise = Api.submitWord(myId, promptId, myWord)

			// then
			await expect(promise).rejects.toThrow(/word was submitted for a prompt other than today's prompt/)
		})
	})
})