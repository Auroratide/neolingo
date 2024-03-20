<script lang="ts">
	import { PUBLIC_TURNSTILE_KEY } from "$env/static/public"

	$effect(() => {
		const cfId = window.turnstile.render("#cf-turnstile", {
			sitekey: PUBLIC_TURNSTILE_KEY,
			callback: () => {},
		})

		return () => {
			window.turnstile.remove(cfId)
		}
	})
</script>

<div id="cf-turnstile"></div>
