import type { Prompt } from "$lib/domain"
import { Client } from "pg"
import { beforeAll, afterAll, beforeEach } from "vitest"

export type TestDb = {
	query: Client["query"],
	setupPrompt: (template?: Omit<Partial<Prompt & { day: Date }>, "id">) => Promise<Prompt>,
}

export function withDb(tests: (db: TestDb) => void) {
	return () => {
		const { VITE_LOCAL_PG_URL } = import.meta.env
		const pg = new Client(VITE_LOCAL_PG_URL)
	
		beforeAll(async () => {
			await pg.connect()
		})
	
		afterAll(async () => {
			await pg.end()
		})
	
		beforeEach(async () => {
			await clearDb(pg)
		})
	
		tests({
			query: pg.query.bind(pg),
			async setupPrompt({
				text = "some prompt",
				letters = 5,
				day = new Date(),
			} = {}) {
				const id = await pg.query(`
					INSERT INTO private.prompts (text, letters, day)
					VALUES ($1, $2, $3)
					RETURNING id
				`, [text, letters, day]).then((result) => result.rows[0].id)

				return { id, text, letters, day }
			},
		})
	}
}

function clearDb(pg: Client) {
	return pg.query(`
		TRUNCATE TABLE
			private.dictionary,
			private.votes,
			private.words,
			private.submissions,
			private.prompts,
			private.people
		RESTART IDENTITY;
	`)
}
