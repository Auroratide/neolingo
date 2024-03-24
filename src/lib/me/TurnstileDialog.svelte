<script lang="ts">
	import Stack from "$lib/design-system/Stack.svelte"
	import { Elevated } from "$lib/design-system/elevated"
	import { TURNSTILE_CONTAINER_ID } from "./turnstile"

	type Props = {
		oncancel: () => void
	}; const {
		oncancel,
	} = $props<Props>()

	let dialog: HTMLDialogElement

	export function showModal() {
		dialog.showModal()
	}

	export function close() {
		dialog.close()
	}

	$effect(() => {
		dialog.addEventListener("close", oncancel)
		return () => dialog.removeEventListener("close", oncancel)
	})
</script>

<dialog bind:this={dialog} class="{Elevated}" aria-labelledby="turnstile-dialog-title">
	<Stack size="1em">
		<p id="turnstile-dialog-title"><strong>You're a human, right?</strong></p>
		<div id="{TURNSTILE_CONTAINER_ID}"></div>
		<p><small>You only have to confirm this once!</small></p>
	</Stack>
	<button onclick={close} class="close" aria-label="close without verifying" title="close without verifying">&times;</button>
</dialog>

<style>
	dialog {
		font-size: 1.15em;
		text-align: center;
		position: fixed;
		inset: 50%;
		transform: translate(-50%, -50%);
		width: 30em;
		max-width: 95vw;
		padding: 1em;
		background: var(--color-a);
		border: 0.25em solid var(--color-i);
		color: var(--color-u);
	}

	dialog::backdrop {
		background: oklch(0% 0 0 / 0.75);
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

		&::before, &::after {
			content: none;
			display: none;
		}
	}
</style>
