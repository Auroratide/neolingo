<script lang="ts">
	import FormCard from "$lib/design-system/FormCard.svelte"
	import type { PageData } from "./$types"

	type Props = {
		data: PageData
	}; const {
		data,
	}: Props = $props()
</script>

<FormCard
	focus
	id="feedback-section"
	title="Feedback"
	content={Promise.resolve("")}
	waiting-label="Sending your feedback"
	submitted-label="Sending feedback"
	onsubmit={async () => {}}
>
	{#snippet form()}
		<p>TODO: This form is currently non-functional. It is a placeholder.</p>

		<div class="input-group">
			<label for="feedback-topic">Topic</label>
			<select id="feedback-topic">
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
				required
				placeholder="Type your feedback here"
				rows="4"
				maxlength="2500"
			></textarea>
		</div>

		<button type="submit" class="slightly-larger" disabled>
			Submit Feedback
		</button>
	{/snippet}
</FormCard>

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
</style>
