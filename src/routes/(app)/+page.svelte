<script lang="ts">
	import Stack from "$lib/design-system/Stack.svelte"
	import Introduction from "./Introduction.svelte"
	import InventWord from "./InventWord.svelte"
	import Vote from "./Vote.svelte"
	import NextSteps from "./NextSteps.svelte"
	import prompt from "$lib/prompt/prompt.svelte"
	import votes from "$lib/votes"
</script>

<svelte:head>
	<title>Fictionary</title>
</svelte:head>
<Stack size="3em">
	<Introduction />
	<InventWord />
	{#if prompt.myWord}
		<Vote />
	{/if}
	{#if votes.myVote}
		<NextSteps />
	{/if}
</Stack>
