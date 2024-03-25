import { addAllPrompts } from "./add-all"
import { describe, test, expect } from "vitest"
import * as path from "node:path"
import { withDb } from "../test/withDb"

describe("admin: prompts", withDb((db) => {
	test("add all", async () => {
		// given
		const dbUrl = process.env.DB_URL!
		const csvFile = path.join(import.meta.dirname, "prompts.test.csv")

		await db.setupPrompt({
			text: "pre-existing prompt",
			day: new Date(2023, 11, 30),
		})

		// when
		await addAllPrompts(dbUrl, csvFile)

		// then
		const previouslyThere = await db.query("SELECT text FROM private.prompts WHERE day = '2023-12-30'")
			.then((res) => res.rows[0].text)

		const { id: newlyAddedId, text: newlyAddedText } = await db.query("SELECT id, text FROM private.prompts WHERE day = '2023-12-31'")
			.then((res) => res.rows[0])

		expect(previouslyThere).toEqual("pre-existing prompt")
		expect(newlyAddedText).toEqual("(test) prompt 2")

		// and
		const initialWordsRowTwo = await db.query("SELECT text FROM private.words WHERE prompt_id = $1", [newlyAddedId])
			.then((res) => res.rows.map((row) => row.text))

		expect(initialWordsRowTwo).toEqual(expect.arrayContaining(["twoone", "twotwo"]))

		// and
		const rowThreeId = await db.query("SELECT id FROM private.prompts WHERE day = '2024-01-01'")
			.then((res) => res.rows[0].id)
		const initialWordsRowThree = await db.query("SELECT text FROM private.words WHERE prompt_id = $1", [rowThreeId])
			.then((res) => res.rows.map((row) => row.text))

		expect(initialWordsRowThree).toEqual(expect.arrayContaining(["threeone", "threetwo"]))
	})
}))
