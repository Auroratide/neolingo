<script lang="ts">
	import type { Word, WordId } from "../domain"

	type Props = {
		id: string,
		words: readonly Word[],
		value: WordId | undefined,
	}; let {
		id,
		words,
		value,
	} = $props<Props>()
</script>

<fieldset>
	<legend>Which word do you like best?</legend>
	<div class="gridded-radios larger">
		{#each words as word (word.id)}
			<input
				id="{id}-{word.id}"
				type="radio"
				name="{id}"
				bind:group={value}
				value="{word.id}"
				required
				class="checkmark"
			/>
			<label for="{id}-{word.id}">{word.text}</label>
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
		grid-template-columns: 2fr 5fr;
		column-gap: 0.5em;
		row-gap: 0.5em;
		text-align: start;

		input {
			place-self: center end;
		}

		label {
			place-self: center start;
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
</style>