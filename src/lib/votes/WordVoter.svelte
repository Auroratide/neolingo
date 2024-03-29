<script lang="ts">
	import { VisuallyHidden } from "$lib/design-system/visually-hidden"
	import type { SubmittedWord, SubmittedWordId } from "../domain"
	import { fly } from "svelte/transition"

	type Props = {
		id: string,
		words: readonly SubmittedWord[],
		value: SubmittedWordId | undefined,
		myWord: string,
		specificWord: SubmittedWord | undefined,
		canReplace?: boolean,
		onreplaceword: (index: number) => void,
		onsearchword: (search: string) => Promise<SubmittedWord | undefined>,
	}; let {
		id,
		words,
		// value = $bindable(), // will be needed in next.82+
		value,
		specificWord,
		myWord,
		canReplace = true,
		onreplaceword,
		onsearchword,
	}: Props = $props()

	type SearchState = "idle" | "searching" | "not-found" | "my-word" | "found" | "already-listed"
	let currentSearch = $state(specificWord?.text ?? "")
	let isSearching = $state(false)
	let submittedSearch = $state(specificWord?.text ?? "")
	let searchResult = $state(specificWord)

	const searchState = $derived.by<SearchState>(() => {
		if (isSearching)
			return "searching"
		else if (searchResult == null && submittedSearch === "")
			return "idle"
		else if (searchResult == null)
			return "not-found"
		else if (searchResult?.text === myWord)
			return "my-word"
		else if (words.some((word) => word.text === specificWord?.text))
			return "already-listed"
		else
			return "found"
	})

	async function onSearch(e: Event) {
		if (currentSearch === specificWord?.text) {
			return // continue form submission
		}

		e.stopPropagation()
		e.preventDefault()

		isSearching = true
		searchResult = await onsearchword(currentSearch).catch((e) => {
			isSearching = false
			throw e
		})
		submittedSearch = currentSearch
		isSearching = false

		if (searchResult != null) {
			value = searchResult.id
		}
	}
</script>

<fieldset>
	<legend>Which word do you like best?</legend>
	<div class="gridded-radios larger">
		{#each words as word, i (word.id)}
			{@render wordoption(word, i, canReplace)}
		{/each}
		<label for="{id}-word-search" class="span-all smaller space-before" style:--row="{words.length}">Or, find a specific word</label>
		<div class="span-all row smaller" style:--row="{words.length + 1}">
			<input
				id="{id}-word-search"
				name="{id}-word-search"
				bind:value={currentSearch}
				type="search"
				placeholder="type word"
				autocomplete="off"
				spellcheck="false"
				onkeypress={(e) => e.key === "Enter" && onSearch(e)}
			/>
			<button type="button" class="subtle-button" onclick={onSearch}>Find</button>
		</div>
		{#if searchState === "searching"}
			{@render transitioningPhrase("", words.length + 2)}
		{/if} {#if searchState === "already-listed"}
			{@render transitioningPhrase("This word is already listed above.", words.length + 2)}
		{/if} {#if searchState === "not-found"}
			{@render transitioningPhrase("We could not find this word.", words.length + 2)}
		{/if} {#if searchState === "my-word"}
			{@render transitioningPhrase("Hey, that's your word!", words.length + 2)}
		{/if} {#if searchState === "found" && specificWord != null}
			{@render wordoption(specificWord, words.length + 2, false)}
		{/if} {#if searchState === "idle"}
			{@render transitioningPhrase("", words.length + 2)}
		{/if}
	</div>
</fieldset>

{#snippet wordoption(word: SubmittedWord, i: number, allowReplace: boolean)}
	<!-- grid areas help the transition to overlap correctly -->
	<div style:grid-area="{i + 1} / 1 / {i + 2} / 2"><!-- spacing --></div>
	<button class="x-button" type="button" onclick={() => onreplaceword(i)} title="Replace {word.text}" style:grid-area="{i + 1} / 2 / {i + 2} / 3" disabled={!allowReplace}>
		<span class="{VisuallyHidden}">Replace {word.text}</span>
		<span aria-hidden="true">&times;</span>
	</button>
	<input
		id="{id}-{word.id}"
		type="radio"
		name="{id}"
		bind:group={value}
		value="{word.id}"
		required
		class="checkmark"
		style:grid-area="{i + 1} / 3 / {i + 2} / 4"
	/>
	<label for="{id}-{word.id}" in:fly={{ x: -20, duration: 120, delay: 60 }} out:fly={{ x: 20, duration: 120 }} style:grid-area="{i + 1} / 4 / {i + 2} / 5">
		{word.text}
	</label>
{/snippet}

{#snippet transitioningPhrase(text: string, row: number)}
	<p class="span-all smaller" style:--row="{row}" in:fly={{ x: -20, duration: 120, delay: 60 }} out:fly={{ x: 20, duration: 120 }}>
		{text}
	</p>
{/snippet}

<style>
	fieldset {
		border-inline: none;
		border-block: 0.125em solid var(--color-a);
		width: min(100%, 25em);
	}

	fieldset:has(input:checked) input[type="radio"]:not(:checked),
	fieldset:has(input:checked) input[type="radio"]:not(:checked) + label {
		opacity: 0.667;
	}

	legend {
		margin: auto;
		padding-inline: 0.5em;
	}

	input, label { cursor: pointer; }

	.gridded-radios {
		display: grid;
		grid-template-columns: calc(25% - 1.5em) auto auto 1fr;
		column-gap: 0.5em;
		row-gap: 0.5em;
		text-align: start;

		input { place-self: center end; }

		label {
			place-self: center start;
			hyphens: auto;
		}

		.span-all {
			width: 100%;
			min-height: 1em;
			grid-column: 1 / -1;
			grid-row: calc(var(--row) + 1);
			text-align: center;
		}

		.space-before {
			margin-block-start: 1em;
		}
	}

	.larger { font-size: 1.25em; }

	.checkmark {
		--w: 0.5em;
		--h: 0.2em;
		--r2: 1.4142;
		--x0: 0.25em;
		--y0: 0.25em;
		--dur: 0.1s;

		font-size: 1em;
		appearance: none;
		width: 0.75em;
		height: 0.75em;
		border: 0.125em solid var(--color-o);
		border-radius: 50%;
		vertical-align: middle;
		position: relative;
	}

	.checkmark::before,
	.checkmark::after {
		content: "";
		position: absolute;
		inset: 0;
		display: block;
		background: var(--color-u);
		width: var(--w);
		height: var(--h);
		transform-origin: center left;
		transition: transform var(--dur)
	}

	.checkmark::before {
		--translation: calc((var(--w) - var(--h) / 2) / 1.4142);
		transform:
			translate(calc(var(--x0) - var(--translation)), calc(var(--y0) - var(--translation)))
			rotate(45deg)
			scaleX(0);
		transition-timing-function: ease-in;
		transition-delay: var(--dur);
	}

	.checkmark::after {
		--translation: calc(var(--h) / 2.8284);
		transform:
			translate(calc(var(--x0) - var(--translation)), calc(var(--y0) + var(--translation)))
			rotate(-45deg)
			scaleX(0);
		transition-timing-function: ease-out;
		transition-delay: 0s;
	}

	.checkmark:checked::before {
		transition-delay: 0s;
		transform:
			translate(calc(var(--x0) - var(--translation)), calc(var(--y0) - var(--translation)))
			rotate(45deg)
			scaleX(1);
	}

	.checkmark:checked::after {
		transition-delay: var(--dur);
		transform:
			translate(calc(var(--x0) - var(--translation)), calc(var(--y0) + var(--translation)))
			rotate(-45deg)
			scaleX(1.5);
	}

	@media (prefers-reduced-motion: reduce) {
		.checkmark::before,
		.checkmark::after {
			transition: none;
		}
	}

	.x-button {
		all: unset;
		display: block;
		width: 1.5em;
		cursor: pointer;
		text-align: center;
		place-self: center start;
		color: var(--color-o);

		&:hover { color: var(--color-u); }

		&:focus-visible {
			outline: 0.125em dotted var(--color-o);
			outline-offset: 0.125em;
		}

		&::before, &::after { all: unset; }

		&:disabled {
			opacity: 0;
			cursor: auto;
		}
	}

	.subtle-button {
		border-width: 0.125em;
		padding: 0.125em 1em;

		&::before, &::after { all: unset; }
	}

	.smaller { font-size: 0.875em; }

	.row {
		display: flex;
		flex-direction: row;
		gap: 0.5em;
		align-items: flex-end;
		flex-wrap: wrap;
		justify-content: center;
	}
</style>