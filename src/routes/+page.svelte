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

<Stack size="3em">
	<Introduction />
	{#if true} <!-- this looks dumb, but it's to make the transition not trigger on navigation -->
		<InventWord focus={step < 1} />
	{/if}
	{#if step > 0}
		<Vote focus={step < 2} />
	{/if}
	{#if step > 1}
		<NextSteps />
	{/if}
</Stack>
