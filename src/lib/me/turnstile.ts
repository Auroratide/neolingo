import { PUBLIC_TURNSTILE_KEY } from "$env/static/public"

export const TURNSTILE_CONTAINER_ID = "cf-turnstile"

export async function turnstile(onChallenge: () => void)  {
	return new Promise<string>((resolve, reject) => {
		window.turnstile.render(`#${TURNSTILE_CONTAINER_ID}`, {
			sitekey: PUBLIC_TURNSTILE_KEY,
			callback: (token: string) => resolve(token),
			"error-callback": () => {
				reject(new Error("The captcha check failed in the background. Please refresh the page and try again."))
			},
			"before-interactive-callback": () => {
				onChallenge()
			},
		})
	})
}
