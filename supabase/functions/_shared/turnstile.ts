export async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
	const isTestMode = Deno.env.get("ENV") === "local"
	if (isTestMode) {
		return !token.includes("FAIL")
	}

	const form = new FormData()
	form.append("secret", Deno.env.get("TURNSTILE_SECRET_KEY") ?? "")
	form.append("response", token)
	form.append("remoteip", ip)

	const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
		method: "POST",
		body: form,
	})

	const data = await response.json()
	return data.success
}