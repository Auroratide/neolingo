import { Client } from "https://deno.land/x/postgres@v0.19.3/mod.ts"

const db = new Client(Deno.env.get("SUPABASE_DB_URL"))

const CORS = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "POST",
	"Access-Control-Allow-Headers": "authorization,content-type,x-forwarded-for,apikey,x-client-info",
}

const HEADERS = {
	...CORS,
	"Content-Type": "application/json",
}

function ips(req: Request) {
	return req.headers.get("x-forwarded-for")?.split(/\s*,\s*/)
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
	const isTestMode = Deno.env.get("ENV") === "local"
	if (isTestMode) {
		return !token.includes("FAIL")
	}

	const form = new FormData()
	form.append("secret", Deno.env.get("CLOUDFLARE_SECRET_KEY") ?? "")
	form.append("response", token)
	form.append("remoteip", ip)

	const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
		method: "POST",
		body: form,
	})

	const data = await response.json()
	return data.success
}

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

Deno.serve(async (req) => {
	if (req.method === "OPTIONS") {
		return new Response(null, {
			headers: { ...CORS },
		})
	}

	const { token } = await req.json()
	const ip = (ips(req) || [""])[0]

	const verified = await verifyTurnstile(token, ip)

	if (!verified) {
		return new Response(JSON.stringify({
			message: "not verified",
		}), {
			status: 403,
			headers: HEADERS,
		})
	}

	let id: string
	try {
		id = await generateNewPerson()
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err)
		return new Response(JSON.stringify({
			message: "failed to generate new person id",
		}), {
			status: 500,
			headers: HEADERS,
		})
	}

	return new Response(JSON.stringify({ id }), {
		status: 201,
		headers: HEADERS,
	})
})
