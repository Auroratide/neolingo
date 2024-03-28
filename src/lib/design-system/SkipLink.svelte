<script lang="ts">
	import type { Snippet } from "svelte"

	type Props = {
		href: string,
		children: Snippet,
	}; const {
		href,
		children,
	}: Props = $props()
</script>

<a class="skip-link button" {href}>{@render children()}</a>

<style>
	.skip-link {
		position: absolute;
		inset-block-start: 0.25em;
		inset-inline-start: 0.25em;
		clip-path: inset(50%);
		font-size: 0.875em;
		background-color: var(--color-a);
		z-index: 999;
	}

	.skip-link:focus { clip-path: none; }
</style>
