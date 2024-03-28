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
</style>