<script lang="ts">
	import FormCard from "$lib/design-system/FormCard.svelte"
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
		<label for="feedback-topic">Topic</label>
		<select id="feedback-topic">
			<option>General</option>
			<option>Something is not working</option>
			<option>I have an idea</option>
		</select>
		<label for="feedback-content">Your feedback</label>
		<textarea id="feedback-content" required></textarea>
		<button type="submit" class="slightly-larger" disabled>
			Submit Feedback
		</button>
	{/snippet}
</FormCard>

<style>
	.slightly-larger { font-size: 1.15em; }
</style>
