<script lang="ts">
	import FocusCard from "$lib/design-system/FocusCard.svelte"
	import prompt from "$lib/prompt/prompt.svelte"
	import Share from "./Share.svelte"
</script>

<FocusCard id="whats-next-section">
	<div class="small-stack">
		<h2 class="text-center">What's next?</h2>
		<p class="text-center balance more-space-after">Come back tomorrow to see which word won and then invent another new word!</p>
		{#await prompt.content}
			<div class="invisible small-stack">
				<Share word="" definition="" />
			</div>
		{:then content}
			<Share word={prompt.myWord} definition={content.text} />
		{/await}
	</div>
</FocusCard>

<style>
	.text-center { text-align: center; }
	.balance { white-space: balance; }

	.more-space-after { margin-block-end: 1em; }

	.small-stack {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	.invisible { visibility: hidden; }
</style>
