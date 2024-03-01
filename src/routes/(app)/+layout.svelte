<script lang="ts">
	import type { Snippet } from "svelte"
	import Container from "$lib/Container.svelte"
	import Stack from "$lib/Stack.svelte"
	import Notifier from "$lib/notifications/Notifier.svelte"

	type Props = { children: Snippet }
	const { children } = $props<Props>()
</script>

<Container>
	<Stack>
		<header>
			<h1>Fictionary</h1>
		</header>
		<main>
			{@render children()}
		</main>
		<footer>
			<p>© Auroratide (Timothy Foster), All Rights Reserved.</p>
		</footer>
	</Stack>
</Container>
<Notifier />

<style>
	main { width: 100%; }
	footer { font-size: 0.875em; }
</style>
