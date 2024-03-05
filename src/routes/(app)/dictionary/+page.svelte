<script lang="ts">
	import WordCard from "$lib/WordCard.svelte"
	import WordCardSkeleton from "$lib/WordCardSkeleton.svelte"
	import FocusCard from "$lib/FocusCard.svelte"
	import * as Api from "$lib/api"
	import { VisuallyHidden } from "$lib/visually-hidden"
	import Stack from "$lib/Stack.svelte"

	const dictionary = Api.getDictionary()
</script>

<svelte:head>
	<title>Dictionary</title>
</svelte:head>
{#await dictionary}
	<p class="{VisuallyHidden}">Loading dictionary. Please wait.</p>
	<div class="stack">
		<WordCardSkeleton />
		<WordCardSkeleton />
		<WordCardSkeleton />
		<WordCardSkeleton />
		<WordCardSkeleton />
		<WordCardSkeleton />
		<WordCardSkeleton />
	</div>
{:then dictionary}
	<ul class="no-list stack">
		{#each dictionary as word (word.word)}
			<li><WordCard value={word} /></li>
		{/each}
	</ul>
{:catch error}
	<FocusCard error>
		<div class="block-spacing">
			<Stack size="1em">
				<p class="title-like"><strong>Something went wrong...</strong></p>
				<p>{error.message}</p>
			</Stack>
		</div>
	</FocusCard>
{/await}

<style>
	.no-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.stack {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.title-like { font-size: 1.5em; }
	.block-spacing { padding-block: 1em; }
</style>