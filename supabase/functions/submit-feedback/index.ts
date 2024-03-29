import { Client } from "https://deno.land/x/postgres@v0.19.3/mod.ts"
import { ips } from "../_shared/headers.ts"
import { verifyTurnstile } from "../_shared/turnstile.ts"
import { handler, created, forbidden, badRequest } from "../_shared/handler.ts"

const db = new Client(Deno.env.get("SUPABASE_DB_URL"))

async function submitFeedback(feedback: {
	topic: string,
	text: string,
}): Promise<void> {
	await db.connect()

	try {
		await db.queryObject`
			INSERT INTO private.feedback (topic, text) VALUES (${feedback.topic}, ${feedback.text})
		`
	} finally {
		await db.end()
	}
}

function validateFeedback(feedback: unknown): {
	valid: boolean,
	reason?: string,
} {
	if (typeof feedback !== "object" || feedback === null) {
		return {
			valid: false,
			reason: "Feedback must be an object.",
		}
	}

	if (!("topic" in feedback) || !("text" in feedback)) {
		return {
			valid: false,
			reason: "Feedback must have a topic and text.",
		}
	}

	const validatedFeedback = feedback as { topic: string, text: string }

	if (validatedFeedback.text.length > 3000) {
		return {
			valid: false,
			reason: "Feedback text is too long.",
		}
	}

	return { valid: true }
}

Deno.serve(handler(async (req) => {
	const { token, payload } = await req.json()

	const ip = (ips(req) || [""])[0]
	const verified = await verifyTurnstile(token, ip)
	if (!verified) {
		return forbidden("not verified")
	}

	const valid = validateFeedback(payload)
	if (!valid.valid) {
		return badRequest(valid.reason ?? "Feedback could not be validated.")
	}

	await submitFeedback(payload)
	return created({})
}))
