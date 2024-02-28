import { describe, expect, test, beforeAll, afterAll } from "vitest"
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
})