<script lang="ts" generics="TContent">
	import type { Snippet } from "svelte"
	import FocusCard from "$lib/FocusCard.svelte"
	import Spinner from "$lib/Spinner.svelte"
	import Stack from "$lib/Stack.svelte"
	import notifications from "$lib/notifications"

	type Props = {
		title: string,
		content: Promise<TContent>,
		form: Snippet<[TContent | undefined, string | undefined]>, // content; error
		"waiting-label": string,
		"submitted-label": string,
		onsubmit: (form: FormData) => Promise<void>,
	}; const {
		title,
		content,
		form,
		"waiting-label": waitingLabel,
		"submitted-label": submittedLabel,
		onsubmit: submitData,
	} = $props<Props>()

	let submitting = $state(false)
	const onsubmit = async (e: SubmitEvent) => {
		e.preventDefault()
		submitting = true

		const form = new FormData(e.currentTarget as HTMLFormElement, e.submitter)
		await submitData(form)
			.catch((e) => notifications.error(e as Error))
			.finally(() => submitting = false)
	}

	let contentFailed = $state(false)
	$effect(() => {
		content.catch(() => {
			contentFailed = true
		})
	})
</script>

{#snippet settled(content: TContent | undefined, error: string | undefined)}
	<form {onsubmit} class:invisible={content == null} inert={submitting}>
		<Stack>
			{@render form(content, error)}
		</Stack>
	</form>
	<div class="overlay-center" class:very-invisible={content != null || error != null}>
		<Spinner label={waitingLabel} />
	</div>
	<div class="overlay-center" class:very-invisible={!submitting}>
		<Spinner label={submittedLabel} />
	</div>
	<div class="overlay-center" class:very-invisible={error == null}>
		<p><strong>Something went wrong...</strong></p>
		<p>{error}</p>
	</div>
{/snippet}

<FocusCard error={contentFailed}>
	<div class="all-text-centered overlay-container">
		<h2>{title}</h2>
		{#await content}
			{@render settled(undefined, undefined)}
		{:then content}
			{@render settled(content, undefined)}
		{:catch e}
			{@render settled(undefined, e.message)}
		{/await}
	</div>
</FocusCard>

<style>
	.invisible { visibility: hidden ; }
	.very-invisible { display: none !important; }

	.all-text-centered { text-align: center; }

	form[inert] {
		opacity: 0.25;
		pointer-events: none;
	}

	.overlay-container { position: relative; }

	.overlay-center {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		align-items: center;
		justify-content: center;
	}
</style>