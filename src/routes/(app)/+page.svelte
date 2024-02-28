<script lang="ts">
	import Stack from "$lib/Stack.svelte"
	import StepOne from "./StepOne.svelte"
	import StepTwo from "./StepTwo.svelte"
</script>

<svelte:head>
	<title>Fictionary</title>
</svelte:head>
<Stack>
	<StepOne />
	<StepTwo />
</Stack>