<script lang="ts">
	import WordInput from "$lib/prompt/WordInput.svelte"
	import prompt from "$lib/prompt/prompt.svelte"
	import FormCard from "$lib/design-system/FormCard.svelte"
	import { MIN_LENGTH } from "$lib/prompt/requirements"

	type Props = {
		focus?: boolean
	}; const {
		focus = false,
	} = $props<Props>()

	let currentWord = $state(prompt.myWord)

	const onsubmit = async (form: FormData) => {
		await prompt.submitWord(form.get("word-input") as string)
	}

	const alreadySubmitted = $derived(prompt.myWord != null && prompt.myWord !== "")
</script>

<FormCard
	id="invent-a-word-section"
	{focus}
	title="Invent a Word"
	content={prompt.content}
	waiting-label="Creating a prompt"
	submitted-label="Sending your word"
	{onsubmit}
	transitionTo={{
		id: "vote-section",
		shouldTransition: () => (prompt.myWord?.length ?? 0) === 0,
	}}
>
	{#snippet form(content)}
		<p>Invent a word that means:</p>
		<p class="balanced">
			<strong class="slightly-larger quoted">{content?.text ?? "this is placeholder text where the prompt text will go after it all loads into place"}</strong>
		</p>
		<WordInput
			id="word-input"
			label="Your word"
			bind:value={currentWord}
			disabled={alreadySubmitted}
		/>
		{#if alreadySubmitted}
			<p class="center slightly-larger button-like-padding">Thanks for your submission!</p>
		{:else}
			<button type="submit" class="slightly-larger" disabled={currentWord.length < MIN_LENGTH || alreadySubmitted}>
				Submit Word
			</button>
		{/if}
	{/snippet}
</FormCard>

<style>
	.slightly-larger { font-size: 1.15em; }

	.balanced { text-wrap: balance; }

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

	.button-like-padding { padding-block: 0.375em; }
</style>