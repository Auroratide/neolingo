<script lang="ts">
	import type { Snippet } from "svelte"
	import { slide } from "svelte/transition"
	import { prefersReducedMotion } from "./media-query"

	type Props = {
		id?: string
		focus?: boolean
		error?: boolean
		transition?: boolean
		children: Snippet
	}; const {
		id,
		focus = false,
		error = false,
		transition = false,
		children,
	} = $props<Props>()

	let transitioning = $state(false)
	const onTransitionStart = () => transitioning = true
	const onTransitionEnd = () => transitioning = false
	const transitionConfig = !transition || prefersReducedMotion()
		? { delay: 0, duration: 0 }
		: { delay: 300 }
</script>

<div class="position-container">
	<section
		{id}
		class="focus-card"
		class:focus
		class:error
		class:transitioning
		transition:slide={transitionConfig}
		onintrostart={onTransitionStart}
		onintroend={onTransitionEnd}
	>
		{@render children()}
	</section>
	{#if transitioning}
		<!-- Shadow element ensures space exists for the transitioning element -->
		<!-- This reduces layout shift and enables scrolling to the element before its transition finishes -->
		<div
			aria-hidden="true"
			class="focus-card"
			style:visibility="hidden"
			inert
		>
			{@render children()}
		</div>
	{/if}
</div>

<style>
	.position-container {
		position: relative;
		width: 100%;
	}

	.focus-card {
		position: relative;
		background: var(--color-e);
		padding: 1.5em 0.75em;
		border: 0.25em solid var(--color-i);
		transition: border-color 0.25s ease-in-out;
		width: 100%;

		&::before, &::after {
			content: "";
			position: absolute;
			height: 0.25em;
			background: var(--color-a);
			pointer-events: none;
			transition: all 0.25s ease-in-out;
		}

		&::before {
			inset-block-start: 0.5em;
			inset-inline: 0.5em 66%;
		}

		&::after {
			inset-block-end: 0.5em;
			inset-inline: 66% 0.5em;
		}

		&:focus-within, &.focus {
			border-color: var(--color-o);

			&::before {
				background: var(--color-u);
				inset-inline: 33% 0.5em;
			}

			&::after {
				background: var(--color-u);
				inset-inline: 0.5em 33%;
			}
		}

		@media (prefers-reduced-motion: reduce) {
			&, &::before, &::after {
				transition: none;
			}
		}
	}

	.error {
		border-color: var(--color-y);

		&::before, &::after {
			background: var(--color-y);
		}
	}

	.transitioning {
		position: absolute;
		inset-block-start: 0;
		inset-inline-start: 0;
	}
</style>
