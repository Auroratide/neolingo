<script lang="ts">
	import notifications from "$lib/notifications"
	import Notifier from "$lib/notifications/Notifier.svelte"

	const makeNormie = () => {
		notifications.normie("It worked!", "This is more detailed message.")
	}

	const makeError = () => {
		notifications.error(Object.assign(new Error("This is a test error"), { solution: "The solution is this." }))
	}
</script>

<Notifier />
<button onclick={makeNormie}>Make normie</button>
<button onclick={makeError}>Make error</button>
