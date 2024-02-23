<script lang="ts">
	import type { Snippet } from "svelte"
	type Props = {
		children: Snippet
	}

	const { children } = $props<Props>()
</script>

<div class="container">
	{@render children()}
</div>

<style>
	.container {
		max-width: 45rem;
		margin: 0 auto;
		padding: 0.5em;
	}
</style>
