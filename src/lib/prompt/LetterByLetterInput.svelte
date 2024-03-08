<script lang="ts">
	type Props = {
		id: string
		letters: number
		label: string
		value?: string
	}
	let { id, letters, label, value = "" } = $props<Props>()

	let splitWord = $derived(Array.from(value.padEnd(letters, " ")))

	let cursorPosition = $state(0)
	const setCursorPosition = (e: Event) => {
		const target = e.target as HTMLInputElement
		cursorPosition = target?.selectionStart ?? target?.value.length ?? 0
	}

	const alphaOnly = `[a-zA-Z]{${letters}}`
</script>

<div class="container center label-underneath">
	<label for="{id}">{label}</label>
	<input
		{id}
		type="text"
		name="{id}"
		bind:value={value}
		onfocus={setCursorPosition}
		onkeyup={setCursorPosition}
		class="invisible-input overlay-letters"
		style:--letters="{letters}"
		minlength={letters}
		maxlength={letters}
		pattern="{alphaOnly}"
		required
		title="{letters} letters"
		autocomplete="off"
		spellcheck="false"
	/>
	<p aria-hidden="true" class="letters">
		{#each splitWord as letter, i}
			{@const hasLetter = letter !== " "}
			<span class:cursor={i === cursorPosition}>
				{#if hasLetter} {letter} {:else} &nbsp; {/if}
			</span>
		{/each}
	</p>
</div>

<style>
	.container { position: relative; }

	.center {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.label-underneath {
		flex-direction: column-reverse;
		gap: 0.5em;
	}

	.invisible-input {
		position: absolute;
		inset: 0;
		background: none;
		border: none;
		color: transparent;
	}

	.overlay-letters {
		/* (2n + 0.25(n - 1)) / 4 */
		padding-inline-start: calc(50% - 1em - 0.5625em * var(--letters) + 0.0625em);
		font-size: 2em;
		font-family: monospace;
		letter-spacing: 0.625em;
	}

	.letters {
		display: flex;
		flex-direction: row;
		gap: 0.5em;
		line-height: 1;

		& > span {
			display: inline-block;
			font-size: 2em;
			width: 1em;
			text-align: center;
			border-block-end: 0.2em solid var(--color-o);
		}
	}

	.container:focus-within {
		.letters > span.cursor {
			animation: blink 1s infinite step-end;

			@media (prefers-reduced-motion: reduce) {
				animation: none;
				border-block-end-color: var(--color-u);
			}
		}
	}
	
	@keyframes blink {
		0% { border-block-end-color: var(--color-u); }
		50% { border-block-end-color: var(--color-o); }
		75% { border-block-end-color: var(--color-u); }
		100% { border-block-end-color: var(--color-u); }
	}
</style>