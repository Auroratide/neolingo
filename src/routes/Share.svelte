<script lang="ts">
	import notifications from "$lib/notifications"
	import XLogo from "$lib/vendor/XLogo.svelte"
	import { fly } from "svelte/transition"

	type Props = {
		word: string
		definition: string
	}; const {
		word,
		definition,
	} = $props<Props>()

	const text = $derived(
		`I invented a new word!\n\n${word}: ${definition}\n\nInvent your own word at neolingo.fun.`,
	)

	let copied = $state(false)
	let timeout = $state(-1)
	const copyToClipboard = async () => {
		window.clearTimeout(timeout)
		try {
			await navigator.clipboard?.writeText?.(text)
			copied = true
			timeout = window.setTimeout(() => copied = false, 5000)
		} catch (e) {
			notifications.error(e as Error)
		}
	}
</script>

<div class="small-stack" class:invisible={word.length === 0}>
	<p>Share your word on social media:</p>
	<blockquote class="space-after">
		<p>I invented a new word!</p>
		<p><strong>{word}</strong>: {definition}</p>
		<p>Invent your own word at neolingo.fun.</p>
	</blockquote>
	<ul class="row-list">
		<li>{@render xlink()}</li>
		<li>{@render copyPaste()}</li>
	</ul>
</div>

{#snippet xlink()}
	<a class="button" href="https://twitter.com/intent/tweet?text={encodeURIComponent(text)}">
		<XLogo /> Tweet it
	</a>
{/snippet}

{#snippet copyPaste()}
	<button class="position-container" onclick={copyToClipboard}>
		<span class="define-the-space">Copy/Paste</span>
		{#if !copied}
			<span class="transitions" transition:fly={{duration: 120, x: 20 }}>Copy/Paste</span>
		{:else}
			<span class="transitions" transition:fly={{duration: 120, x: -20 }}>Copied!</span>
		{/if}
	</button>
{/snippet}

<style>
	.small-stack {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	.invisible { visibility: hidden; }

	.row-list {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 1em;
		flex-wrap: wrap;
	}

	.position-container { position: relative; }
	.define-the-space { visibility: hidden; }
	.transitions {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		inset-block: 0.15em;
		inset-inline: 0.25em;
	}

	.space-after { margin-block-end: 1em; }
</style>
