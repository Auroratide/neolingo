<script lang="ts">
	import FormCard from "$lib/design-system/FormCard.svelte"
	import type { PageData } from "./$types"
	import * as Api from "$lib/api"
	import TurnstileDialog from "$lib/me/TurnstileDialog.svelte"
	import { turnstile } from "$lib/me/turnstile"

	type Props = {
		data: PageData
	}; const {
		data,
	}: Props = $props()

	let challengeDialog = $state<TurnstileDialog | null>(null)
	const onChallenge = () => {
		challengeDialog?.showModal()
	}

	const onTurnstileComplete = (token: string) => {
		challengeDialog?.close()
		return token
	}

	let rejectChallenge: (v?: unknown) => void = $state(() => {})

	let submitted = $state(false)
	const onsubmit = async (form: FormData) => {
		const token = await Promise.race([
			turnstile(onChallenge).then(onTurnstileComplete),
			new Promise((resolve) => rejectChallenge = resolve).then(() => {
				throw new Error("You must complete the captcha to submit a word.")
			}),
		])

		await Api.submitFeedback(token, {
			topic: form.get("topic") as string,
			text: form.get("text") as string,
		})

		submitted = true
	}

	const resetSubmitted = () => {
		submitted = false
	}
</script>

<FormCard
	focus={!submitted}
	id="feedback-section"
	title="Feedback"
	content={Promise.resolve("")}
	waiting-label="Sending your feedback"
	submitted-label="Sending feedback"
	onsubmit={onsubmit}
>
	{#snippet form()}
		<p>If you have an idea, something went wrong, or you just want to show appreciation, let me know by filling out the form below!</p>

		<div class="input-group">
			<label for="feedback-topic">Topic</label>
			<select id="feedback-topic" name="topic" onchange={resetSubmitted}>
				<option selected={data.initialTopic === "general"}>General feedback</option>
				<option selected={data.initialTopic === "bug"}>Something is not working</option>
				<option selected={data.initialTopic === "idea"}>I have an idea</option>
				<option selected={data.initialTopic === "accessibility"}>Accessibility issue</option>
			</select>
		</div>

		<div class="input-group">
			<label for="feedback-content">Your feedback</label>
			<textarea
				id="feedback-content"
				name="text"
				required
				placeholder="Type your feedback here"
				rows="4"
				maxlength="2500"
				oninput={resetSubmitted}
			></textarea>
		</div>

		{#if submitted}
			<p class="slightly-larger button-like-padding">Thank you for helping improve Neolingo!</p>
		{:else}
			<button type="submit" class="slightly-larger">
				Submit Feedback
			</button>
		{/if}
	{/snippet}
</FormCard>
<TurnstileDialog bind:this={challengeDialog} oncancel={rejectChallenge} />

<style>
	.slightly-larger { font-size: 1.15em; }

	.input-group {
		inline-size: 100%;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 0.25em;

		label {
			text-align: start;
		}
	}

	.button-like-padding { padding-block: 0.375em; }
</style>
