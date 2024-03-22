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

		const newlyAdded = await db.query("SELECT text FROM private.prompts WHERE day = '2023-12-31'")
			.then((res) => res.rows[0].text)

		expect(previouslyThere).toEqual("pre-existing prompt")
		expect(newlyAdded).toEqual("(test) prompt 2")
	})
}))
