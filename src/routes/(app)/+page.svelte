<script lang="ts">
	import Stack from "$lib/design-system/Stack.svelte"
	import Introduction from "./Introduction.svelte"
	import InventWord from "./InventWord.svelte"
	import Vote from "./Vote.svelte"
	import NextSteps from "./NextSteps.svelte"
	import prompt from "$lib/prompt/prompt.svelte"
	import votes from "$lib/votes"

	const done = (s: string | undefined): 0 | 1 => s ? 1 : 0
	const step = $derived(done(prompt.myWord) + done(votes.myVote))
</script>

<svelte:head>
	<title>Fictionary</title>
</svelte:head>
<Stack size="3em">
	<Introduction />
	<InventWord focus={step < 1} />
	{#if step > 0}
		<Vote focus={step < 2} />
	{/if}
	{#if step > 1}
		<NextSteps />
	{/if}
</Stack>
