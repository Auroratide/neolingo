<script lang="ts">
	import { MIN_LENGTH, MAX_LENGTH } from "./requirements"

	type Props = {
		id: string
		label: string
		value?: string
		disabled?: boolean
	}; let {
		id,
		label,
		value = $bindable(""),
		disabled = false,
	}: Props = $props()

	const forceLowercase = (e: Event) => {
		const target = e.target as HTMLInputElement
		value = target.value.toLocaleLowerCase()
	}

	const alphaOnly = `[a-zA-Z]{${MIN_LENGTH},${MAX_LENGTH}}`
</script>

<div class="container center label-underneath">
	<label for="{id}">{label}</label>
	<input
		{id}
		type="text"
		name="{id}"
		bind:value={value}
		onchange={forceLowercase}
		class="large-letters fill-in-the-blank lowercase"
		minlength={MIN_LENGTH}
		maxlength={MAX_LENGTH}
		pattern="{alphaOnly}"
		required
		title="between {MIN_LENGTH} and {MAX_LENGTH} letters"
		autocomplete="off"
		spellcheck="false"
		placeholder="your word here"
		{disabled}
	/>
</div>

<style>
	.container {
		position: relative;
		max-width: 100%;
	}

	.large-letters {
		font-size: min(2em, 8vw);
		text-align: center;
	}

	.fill-in-the-blank {
		display: block;
		background: none;
		border: unset;
		color: var(--color-u);
		letter-spacing: 0.1em;
		padding: 0;
		border-block-end: 0.2em solid var(--color-o);
		width: 12.5em;
		max-width: 100%;
	}

	.fill-in-the-blank:focus {
		border-block-end-color: var(--color-u);
	}

	.fill-in-the-blank:disabled {
		border-color: var(--color-a);
	}

	.fill-in-the-blank::placeholder {
		color: var(--color-o);
		opacity: 0.5;
	}

	.lowercase { text-transform: lowercase; }

	.center {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.label-underneath {
		flex-direction: column-reverse;
		gap: 0.5em;
	}
</style>