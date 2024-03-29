import { Client } from "https://deno.land/x/postgres@v0.19.3/mod.ts"
import { ips } from "../_shared/headers.ts"
import { verifyTurnstile } from "../_shared/turnstile.ts"
import { handler, created, forbidden } from "../_shared/handler.ts"

const db = new Client(Deno.env.get("SUPABASE_DB_URL"))

async function generateNewPerson(): Promise<string> {
	await db.connect()

	try {
		const result = await db.queryObject<{ id: string }>`
			INSERT INTO private.people DEFAULT VALUES RETURNING id
		`
		const id = result.rows[0].id

		return id
	} finally {
		await db.end()
	}
}

Deno.serve(handler(async (req) => {
	const { token } = await req.json()

	const ip = (ips(req) || [""])[0]
	const verified = await verifyTurnstile(token, ip)
	if (!verified) {
		return forbidden("not verified")
	}

	const id = await generateNewPerson()
	return created({ id })
}))
