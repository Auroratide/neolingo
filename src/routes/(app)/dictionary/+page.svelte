<script lang="ts">
	import WordCard from "$lib/WordCard.svelte"
	import * as Api from "$lib/api"

	const dictionary = Api.getDictionary()
</script>

<svelte:head>
	<title>Dictionary</title>
</svelte:head>
{#await dictionary then dictionary}
	<ul class="no-list stack">
		{#each dictionary as word (word.word)}
			<li><WordCard value={word} /></li>
		{/each}
	</ul>
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
</style>