<script lang="ts">
	import notifications from "./notifications.svelte"
	import NotificationDialog from "./NotificationDialog.svelte"
</script>

{#each notifications.list as notification, i (notification.id)}
	{@const isTop = i === notifications.list.length - 1}
	<NotificationDialog open={isTop} value={notification} />
{/each}
