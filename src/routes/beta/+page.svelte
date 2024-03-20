<script lang="ts">
	import { goto } from "$app/navigation"
	import featureFlags from "$lib/feature-flags.svelte"
	import Spinner from "$lib/design-system/Spinner.svelte"

	$effect(() => {
		featureFlags.enable()
		goto("/")
	})
</script>

<Spinner label="Redirecting" />
