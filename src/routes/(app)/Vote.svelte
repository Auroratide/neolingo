<script lang="ts">
	import WordVoter from "$lib/votes/WordVoter.svelte"
	import votes, { WORDS_TO_CHOOSE } from "$lib/votes"

	import FormCard from "$lib/design-system/FormCard.svelte"

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
		votes.replaceWord(index)
	}
</script>

<FormCard
	id="vote-section"
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
		<WordVoter id="word-vote" words={content != null ? votes.votableWords : placeholder} bind:value={currentVote} {onreplaceword} />
		<button type="submit" class="slightly-larger" disabled={currentVote == null}>
			Submit Vote
		</button>
	{/snippet}
</FormCard>

<style>
	.slightly-larger { font-size: 1.15em; }
</style>