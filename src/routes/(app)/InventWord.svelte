<script lang="ts">
	import LetterByLetterInput from "$lib/LetterByLetterInput.svelte"
	import prompt from "$lib/prompt.svelte"
	import FormCard from "$lib/FormCard.svelte"

	let currentWord = $state(prompt.myWord)

	const onsubmit = async (form: FormData) => {
		await prompt.submitWord(form.get("word-input") as string)
	}
</script>

<FormCard
	id="invent-a-word-section"
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
		<LetterByLetterInput
			id="word-input"
			letters={content?.letters == null ? 1 : content.letters}
			label="Your word"
			bind:value={currentWord}
		/>
		<button type="submit" class="slightly-larger" disabled={currentWord.length !== content?.letters}>
			Submit Word
		</button>
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
</style>