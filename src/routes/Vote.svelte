<script lang="ts">
	import WordVoter from "$lib/votes/WordVoter.svelte"
	import votes, { WORDS_TO_CHOOSE } from "$lib/votes"
	import FormCard from "$lib/design-system/FormCard.svelte"
	import prompt from "$lib/prompt"
	import Stack from "$lib/design-system/Stack.svelte"

	type Props = {
		focus?: boolean
	}; const {
		focus = false,
	}: Props = $props()

	let currentVote = $state(votes.myVote)

	const onsubmit = async (form: FormData) => {
		await votes.submitVote(form.get("word-vote") as string)
	}

	const placeholder = [...Array(WORDS_TO_CHOOSE).keys()].map((i) => ({
		id: (-i).toString(),
		text: "placeholder",
		tally: 0,
	}))

	const onreplaceword = (index: number) => {
		const wordToReplace = votes.votableWords[index]
		if (wordToReplace.id === currentVote) {
			currentVote = undefined
		}

		votes.replaceWord(index)
	}

	const submittedThisWord = $derived(votes.myVote != null && votes.myVote === currentVote)
</script>

<FormCard
	id="vote-section"
	{focus}
	title="Vote"
	content={votes.allWords}
	waiting-label="Finding words"
	submitted-label="Sending your vote"
	{onsubmit}
	transitionTo={{
		id: "whats-next-section",
		shouldTransition: () => (votes.myVote?.length ?? 0) === 0,
	}}
>
	{#snippet form(content)}
		<p>Choose a favorite word that isn't your own:</p>
		<WordVoter
			id="word-vote"
			words={content != null ? votes.votableWords : placeholder}
			bind:value={currentVote}
			specificWord={votes.specificWord}
			myWord={prompt.myWord}
			{onreplaceword}
			onsearchword={votes.findSpecificWord}
		/>
		{#if submittedThisWord}
			<Stack size="0.25em">
				<p class="center slightly-larger">Thanks for your vote!</p>
				<p class="center">You may change your vote whenever you want.</p>
			</Stack>
		{:else}
			<button type="submit" class="slightly-larger" disabled={currentVote == null}>
				Submit Vote
			</button>
		{/if}
	{/snippet}
</FormCard>

<style>
	.slightly-larger { font-size: 1.15em; }
</style>