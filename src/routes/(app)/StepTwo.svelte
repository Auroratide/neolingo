<script lang="ts">
	import WordVoter from "$lib/WordVoter.svelte"
	import votes from "$lib/votes.svelte"

	import FormCard from "$lib/FormCard.svelte"

	let currentVote = $state(votes.myVote)

	const onsubmit = async (form: FormData) => {
		await votes.submitVote(form.get("word-vote") as string)
	}
</script>

<FormCard
	title="Step Two"
	content={votes.list}
	waiting-label="Finding words"
	submitted-label="Sending your vote"
	{onsubmit}
>
	{#snippet form(content)}
		<p>Choose a favorite word that isn't your own:</p>
		<WordVoter id="word-vote" words={content ?? []} bind:value={currentVote} />
		<button type="submit" class="slightly-larger" disabled={currentVote == null}>
			Submit Vote
		</button>
	{/snippet}
</FormCard>

<style>
	.slightly-larger { font-size: 1.15em; }
</style>