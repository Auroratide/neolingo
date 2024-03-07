<script lang="ts">
	import FocusCard from "$lib/FocusCard.svelte"
	import prompt from "$lib/prompt.svelte"
</script>

<FocusCard id="whats-next-section">
	<div class="small-stack">
		<h2 class="text-center">What's next?</h2>
		<p class="text-center balance more-space-after">Come back tomorrow to see which word won and then invent another new word!</p>
		{#await prompt.content}
			<div class="invisible small-stack">
				{@render share("", "")}
			</div>
		{:then content}
			{@render share(prompt.myWord, content.text)}
		{/await}
	</div>
</FocusCard>

{#snippet share(word: string, definition: string)}
	<div class="small-stack" class:invisible={word == null || word.length === 0}>
		<p>Share your word on social media:</p>
		<blockquote>
			<p>I invented a new word!</p>
			<p><strong>{word}</strong>: {definition}</p>
			<p>Invent your own word at fictionary.com.</p>
		</blockquote>
	</div>
{/snippet}

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
