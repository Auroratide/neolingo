<script lang="ts">
	import type { Word } from "$lib/domain"
	import FocusCard from "$lib/FocusCard.svelte"
	import WordVoter from "$lib/WordVoter.svelte"
	import Spinner from "$lib/Spinner.svelte"
	import Stack from "$lib/Stack.svelte"
	import votes from "$lib/votes.svelte"

	let currentVote = $state(votes.myVote)

	let submitting = $state(false)
	const onsubmit = async (e: SubmitEvent) => {
		e.preventDefault()
		submitting = true

		const form = new FormData(e.currentTarget as HTMLFormElement, e.submitter)
		await votes.submitVote(form.get("word-vote") as string)
		submitting = false
	}
</script>

{#snippet form(content: readonly Word[] | undefined)}
	<div class="all-text-centered overlay-container">
		<h2>Step Two</h2>
		<form {onsubmit} class:invisible={content == null} inert={submitting}>
			<Stack>
				<p>Choose a favorite word that isn't your own:</p>
				<WordVoter id="word-vote" words={content ?? []} bind:value={currentVote} />
				<button type="submit" class="slightly-larger" disabled={currentVote == null}>Submit Vote</button>
			</Stack>
		</form>
		<div class="overlay-center" class:very-invisible={content != null}>
			<Spinner label="Creating a prompt" />
		</div>
		<div class="overlay-center" class:very-invisible={!submitting}>
			<Spinner label="Sending your vote" />
		</div>
	</div>
{/snippet}

<FocusCard>
	{#await votes.list}
		{@render form(undefined)}
	{:then list}
		{@render form(list)}
	{/await}
</FocusCard>

<style>
	.slightly-larger { font-size: 1.15em; }

	.balanced { text-wrap: balance; }

	.invisible { visibility: hidden ; }
	.very-invisible { display: none !important; }

	.quoted {
		&::before {
			content: open-quote;
			font-size: 1.25em;
			padding-inline-end: 0.125em;
		}

		&::after {
			content: close-quote;
			font-size: 1.25em;
			padding-inline-start: 0.125em;
		}
	}

	.all-text-centered { text-align: center; }

	form[inert] {
		opacity: 0.25;
		pointer-events: none;
	}

	.overlay-container {
		position: relative;

		.overlay-center {
			position: absolute;
			inset: 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>