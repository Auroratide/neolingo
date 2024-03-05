<script lang="ts">
	import type { Snippet } from "svelte"

	type Props = {
		size?: string
		children: Snippet
	}; const {
		size = "2em",
		children,
	} = $props<Props>()
</script>

<div class="stack" style:--gap="{size}">
	{@render children()}
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--gap);
	}
</style>
