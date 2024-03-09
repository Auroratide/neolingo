<script lang="ts">
	import { VisuallyHidden } from "$lib/design-system/visually-hidden"
	import type { SubmittedWord, SubmittedWordId } from "../domain"
	import { fly } from "svelte/transition"

	type Props = {
		id: string,
		words: readonly SubmittedWord[],
		value: SubmittedWordId | undefined,
		onreplaceword: (index: number) => void,
	}; let {
		id,
		words,
		value,
		onreplaceword,
	} = $props<Props>()
</script>

<fieldset>
	<legend>Which word do you like best?</legend>
	<div class="gridded-radios larger">
		{#each words as word, i (word.id)}
			<!-- grid areas help the transition to overlap correctly -->
			<div style:grid-area="{i + 1} / 1 / {i + 2} / 2"><!-- spacing --></div>
			<button type="button" onclick={() => onreplaceword(i)} title="Replace {word.text}" style:grid-area="{i + 1} / 2 / {i + 2} / 3">
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
		{/each}
	</div>
</fieldset>

<style>
	fieldset {
		border-inline: none;
		border-block: 0.125em solid var(--color-a);
		padding-inline: 2em;
	}

	fieldset:has(input:checked) input:not(:checked),
	fieldset:has(input:checked) input:not(:checked) + label {
		opacity: 0.667;
	}

	input, label { cursor: pointer; }

	.gridded-radios {
		display: grid;
		grid-template-columns: 1fr auto auto 5fr;
		column-gap: 0.5em;
		row-gap: 0.5em;
		text-align: start;

		button {
			display: block;
			width: 1.5em;
			place-self: center start;
			text-align: center;
		}

		input { place-self: center end; }

		label { place-self: center start; }
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

	button {
		all: unset;
		cursor: pointer;
		color: var(--color-o);

		&:hover { color: var(--color-u); }

		&:focus-visible {
			outline: 0.125em dotted var(--color-o);
			outline-offset: 0.125em;
		}

		&::before, &::after { all: unset; }
	}
</style>