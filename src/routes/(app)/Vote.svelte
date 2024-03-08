<script lang="ts">
	import WordVoter from "$lib/votes/WordVoter.svelte"
	import votes from "$lib/votes"

	import FormCard from "$lib/design-system/FormCard.svelte"

	let currentVote = $state(votes.myVote)

	const onsubmit = async (form: FormData) => {
		await votes.submitVote(form.get("word-vote") as string)
	}

	const placeholder = [...Array(3).keys()].map((i) => ({
		id: (-i).toString(),
		text: "placeholder",
		tally: 0,
	}))
</script>

<FormCard
	id="vote-section"
	title="Vote"
	content={votes.votableWords}
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
		<WordVoter id="word-vote" words={content != null ? content : placeholder} bind:value={currentVote} />
		<button type="submit" class="slightly-larger" disabled={currentVote == null}>
			Submit Vote
		</button>
	{/snippet}
</FormCard>

<style>
	.slightly-larger { font-size: 1.15em; }
</style>