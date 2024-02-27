<script lang="ts">
	import type { Snippet } from "svelte"

	type Props = {
		focus?: boolean
		children: Snippet
	}
	const { focus = false, children } = $props<Props>()
</script>

<section class="focus-card" class:focus>
	{@render children()}
</section>

<style>
	.focus-card {
		position: relative;
		background: var(--color-e);
		padding: 1.5em 0.75em;
		border: 0.25em solid var(--color-i);
		transition: border-color 0.25s ease-in-out;
		width: 100%;

		&::before, &::after {
			content: "";
			position: absolute;
			height: 0.25em;
			background: var(--color-a);
			pointer-events: none;
			transition: all 0.25s ease-in-out;
		}

		&::before {
			inset-block-start: 0.5em;
			inset-inline: 0.5em 66%;
		}

		&::after {
			inset-block-end: 0.5em;
			inset-inline: 66% 0.5em;
		}

		&:focus-within, &.focus {
			border-color: var(--color-o);

			&::before {
				background: var(--color-u);
				inset-inline: 33% 0.5em;
			}

			&::after {
				background: var(--color-u);
				inset-inline: 0.5em 33%;
			}
		}

		@media (prefers-reduced-motion: reduce) {
			&, &::before, &::after {
				transition: none;
			}
		}
	}
</style>
