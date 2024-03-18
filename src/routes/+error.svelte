<script lang="ts">
	import { page } from "$app/stores"
	import FocusCard from "$lib/design-system/FocusCard.svelte"
	import Stack from "$lib/design-system/Stack.svelte"

	const status = $derived($page.status)
</script>

<FocusCard error>
	<Stack>
		<h2>Apologies!</h2>
		{#if status === 404}
			<p>We can't find the page you are looking for.</p>
		{:else}
			<p>An error happened. It's our fault, not yours!</p>
		{/if}
		<a class="button" href="/">Return Home</a>
	</Stack>
</FocusCard>
