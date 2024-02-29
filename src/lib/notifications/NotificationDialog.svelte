<script lang="ts">
	import type { ErrorNotification, NormieNotification, Notification } from "./notifications.svelte"
	import { fly } from "svelte/transition"

	type Props = {
		open: boolean
		value: Notification
	}; const {
		open,
		value,
	} = $props<Props>()

	const close = () => {
		value.dismiss()
	}

	const titleLabel = $derived(`${value.id}-title`)
</script>

<dialog id="{value.id}" {open} class="{value.type}" transition:fly={{ duration: 350, x: "3em" }} aria-labelledby="{titleLabel}">
	<section>
		<p id="{titleLabel}"><strong>{value.title}</strong></p>
		{#if value.type === "normie"}
			{@render normie(value.content)}
		{:else if value.type === "error"}
			{@render error(value.content)}
		{/if}
	</section>
	<button onclick={close} class="close" aria-label="close" title="close">&times;</button>
</dialog>

{#snippet normie(content: NormieNotification["content"])}
	<p>{content.message}</p>
{/snippet}

{#snippet error(content: ErrorNotification["content"])}
	<p>{content.message}</p>
	{#if content.solution} <p>{content.solution}</p> {/if}
{/snippet}

<style>
	dialog {
		font-size: 0.875em;
		position: fixed;
		inset-block: auto 0.5em;
		inset-inline: auto 0.5em;
		width: 30em;
		max-width: 95vw;
		padding: 0.5em 0.75em;
		background: var(--bg);
		border: 0.25em solid var(--border);
		box-shadow: 0 0.125em 0.5em -0.125em oklch(0% 0 0 / 0.333);
		color: var(--color-u);
		transition: opacity 350ms ease-out;
		z-index: 9;
		
		opacity: 0;
		display: block;
		&[open] { opacity: 1; }
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	.close {
		display: block;
		position: absolute;
		inset-block-start: 0;
		inset-inline-end: 0;
		border: none;
		background: none;
		font-size: 1.25em;
		padding: 0.25em;
		width: 1.5em;
		height: 1.5em;
		line-height: 1;

		&::before, &&::after {
			content: none;
			display: none;
		}
	}

	.normie {
		--bg: var(--color-e);
		--border: var(--color-i);
	}

	.error {
		--bg: var(--color-y);
		--border: var(--color-e);
	}
</style>