<script lang="ts">
	import type { Prompt } from "$lib/domain"
	import FocusCard from "$lib/FocusCard.svelte"
	import LetterByLetterInput from "$lib/LetterByLetterInput.svelte"
	import Spinner from "$lib/Spinner.svelte"
	import Stack from "$lib/Stack.svelte"
	import prompt from "$lib/prompt.svelte"

	let currentWord = $state(prompt.myWord)

	let submitting = $state(false)
	const onsubmit = async (e: SubmitEvent) => {
		e.preventDefault()
		submitting = true

		const form = new FormData(e.currentTarget as HTMLFormElement, e.submitter)
		await prompt.submitWord(form.get("word-input") as string)
		submitting = false
	}
</script>

{#snippet form(content: Prompt | undefined)}
	<div class="all-text-centered overlay-container">
		<h2>Step One</h2>
		<form {onsubmit} class:invisible={content == null} inert={submitting}>
			<Stack>
				<p>Invent a word that means:</p>
				<p class="balanced"><strong class="slightly-larger quoted">{content?.text ?? "this is placeholder text where the prompt text will go after it all loads into place"}</strong></p>
				<LetterByLetterInput
					id="word-input"
					letters={content?.letters == null ? 1 : content.letters}
					label="Your word"
					bind:value={currentWord}
				/>
				<button type="submit" class="slightly-larger" disabled={currentWord.length !== content?.letters}>Submit Word</button>
			</Stack>
		</form>
		<div class="overlay-center" class:very-invisible={content != null}>
			<Spinner label="Creating a prompt" />
		</div>
		<div class="overlay-center" class:very-invisible={!submitting}>
			<Spinner label="Sending your word" />
		</div>
	</div>
{/snippet}

<FocusCard>
	{#await prompt.content}
		{@render form(undefined)}
	{:then content}
		{@render form(content)}
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