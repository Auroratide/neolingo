<script lang="ts">
	import Stack from "$lib/Stack.svelte"
	import Introduction from "./Introduction.svelte"
	import StepOne from "./InventWord.svelte"
	import StepTwo from "./Vote.svelte"
</script>

<svelte:head>
	<title>Fictionary</title>
</svelte:head>
<Stack>
	<Introduction />
	<StepOne />
	<StepTwo />
</Stack>
