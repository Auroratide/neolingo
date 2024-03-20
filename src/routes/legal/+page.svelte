<script lang="ts">
	import Stack from "$lib/design-system/Stack.svelte"
</script>

<Stack>
	<section>
		<h2>Terms of Service</h2>
		<p>TODO</p>
	</section>
	<section>
		<h2>Privacy Policy</h2>
		<p>TODO</p>
	</section>
</Stack>

<style>
	section { inline-size: 100%; }

	p {
		margin-block-end: 1.5em;
		line-height: 1.25;

		&:last-child { margin-block-end: 0; }
	}
</style>
