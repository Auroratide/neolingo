<script lang="ts">
	import type { Snippet } from "svelte"

	type Props = {
		children: Snippet,
	}; const {
		children,
	}: Props = $props()
</script>

<div class="typography">
	{@render children()}
</div>

<style>
	/* NOTE: nesting does not currently work with :global it seems */

	.typography :global(section) {
		inline-size: 100%;
	}

	.typography :global(p) {
		margin-block-end: 1.5em;
		line-height: 1.25;

		&:last-child { margin-block-end: 0; }
	}

	.typography :global(h2),
	.typography :global(h3) {
		margin-block: 0.25em;
		color: var(--color-o);
	}

	.typography :global(a) {
		text-decoration: none;
		display: inline-block;
		position: relative;
	}

	.typography :global(a:hover) { color: var(--color-u); }

	.typography :global(a::before), .typography :global(a::after) {
		content: "";
		position: absolute;
		inset-inline: 0 0;
		height: 0.05em;
		background: currentColor;
		transition: inset-inline 0.25s ease-in-out;
	}

	.typography :global(a::before) { inset-block-end: 0.2em; }
	.typography :global(a::after) { inset-block-end: 0.15em; }

	.typography :global(a:hover::before), .typography :global(a:focus::before) {
		inset-inline: 0 100%;
	}

	.typography :global(a:hover::after), .typography :global(a:focus::after) {
		inset-inline: 100% 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.typography :global(a::before), .typography :global(a::after) { transition: none; }
	}
</style>