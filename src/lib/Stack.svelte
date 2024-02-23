<script lang="ts">
	import type { Snippet } from "svelte"

	type Props = {
		children: Snippet
	}

	const { children } = $props<Props>()
</script>

<div class="stack">
	{@render children()}
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2em;
	}
</style>
