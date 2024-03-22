<script lang="ts">
	import WordCard from "$lib/design-system/WordCard.svelte"
	import WordCardSkeleton from "$lib/design-system/WordCardSkeleton.svelte"
	import * as Api from "$lib/api"
	import type { OfficialWord } from "$lib/domain"

	const lastWord = Api.getLastWord()
</script>

<section>
	<p class="text-center large">Each day, <strong>invent a word</strong> for a concept that doesn't have a word yet!</p>
</section>
{#await lastWord}
	{@render lastWordSection(undefined)}
{:then lastWord}
	{@render lastWordSection(lastWord)}
{:catch}
	<!-- nothing -->
{/await}

{#snippet lastWordSection(word: OfficialWord | undefined)}
	<section class="less-width small-stack">
		<h2 class="small">Yesterday's word:</h2>
		{#if word}
			<WordCard value={word} />
		{:else}
			<WordCardSkeleton />
		{/if}
	</section>
{/snippet}

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
