<script lang="ts">
	import type { OfficialWord } from "../domain"

	type Props = {
		value: OfficialWord
	}; const {
		value,
	}: Props = $props()

	const formatter = Intl.DateTimeFormat([], {
		year: "numeric",
		month: "short",
		day: "2-digit",
		timeZone: "UTC",
	})
	const formattedDay = $derived(formatter.format(value.day))
	const datetimeAttr = $derived(value.day.toISOString().split("T")[0])
</script>

<article class="word-card stack" aria-labelledby="word-{value.word}">
	<p id="word-{value.word}"><dfn>{value.word}</dfn></p>
	<p class="capitalize">{value.definition}</p>
	<footer>
		<p><time datetime="{datetimeAttr}">{formattedDay}</time></p>
	</footer>
</article>

<style>
	.word-card {
		position: relative;
		background: var(--color-e);
		padding: 0.25em 0.75em;
		border: 0.25em solid var(--color-i);
		transition: border-color 0.25s ease-in-out;
		width: 100%;

		&::before, &::after {
			content: "";
			position: absolute;
			height: 0.25em;
			background: var(--color-a);
			pointer-events: none;
		}

		&::before {
			inset-block-start: 0.75em;
			inset-inline: 66% 0.75em;
		}

		&::after {
			inset-block-end: 0.75em;
			inset-inline: 0.75em 66%;
		}
	}

	dfn {
		font-size: 1.25em;
	}

	.stack {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	footer {
		text-align: end;
		padding-block-end: 0.1em;
		
		p {
			font-size: 0.875em;
		}
	}

	.capitalize::first-letter { text-transform: capitalize; }
</style>
