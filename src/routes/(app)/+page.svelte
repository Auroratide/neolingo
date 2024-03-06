<script lang="ts">
	import Stack from "$lib/Stack.svelte"
	import Introduction from "./Introduction.svelte"
	import InventWord from "./InventWord.svelte"
	import Vote from "./Vote.svelte"
	import NextSteps from "./NextSteps.svelte"
</script>

<svelte:head>
	<title>Fictionary</title>
</svelte:head>
<Stack size="3em">
	<Introduction />
	<InventWord />
	<Vote />
	<NextSteps />
</Stack>
