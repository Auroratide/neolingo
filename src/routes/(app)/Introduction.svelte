<script lang="ts">
	import WordCard from "$lib/WordCard.svelte"
	import WordCardSkeleton from "$lib/WordCardSkeleton.svelte"
	import FocusCard from "$lib/FocusCard.svelte"
	import * as Api from "$lib/api"

	const lastWord = Api.getLastWord()
</script>

<section>
	<p class="text-center large">Each day, <strong>invent a word</strong> for a concept that doesn't have a word yet!</p>
</section>
<section class="less-width small-stack">
	<h2 class="small">Yesterday's word:</h2>
	{#await lastWord}
		<WordCardSkeleton />
	{:then value}
		<WordCard {value} />
	{:catch error}
		<FocusCard error>
			<p class="text-center block-space">{error.message}</p>
		</FocusCard>
	{/await}
</section>

<style>
	.less-width { width: min(25em, 95%); }
	.small { font-size: 1em; }
	.large { font-size: 1.15em; }
	.text-center { text-align: center; }
	.block-space { padding-block: 1em; }

	.small-stack {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}
</style>
