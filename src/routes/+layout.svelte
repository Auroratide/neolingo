<script lang="ts">
	import type { Snippet } from "svelte"
	import Container from "$lib/design-system/Container.svelte"
	import Stack from "$lib/design-system/Stack.svelte"
	import Notifier from "$lib/notifications/Notifier.svelte"
	import { PUBLIC_ENABLED } from "$env/static/public"
	import FocusCard from "$lib/design-system/FocusCard.svelte"

	type Props = { children: Snippet }
	const { children } = $props<Props>()

	const enabled = PUBLIC_ENABLED === "true"
</script>

<Container>
	<Stack>
		<header>
			<h1>Neolingo</h1>
			{#if enabled}	
				<nav>
					<ul class="simple-link-list fancy-links min-spacing">
						<li><a href="/">Invent</a></li>
						<li><a href="/dictionary">Dictionary</a></li>
					</ul>
				</nav>
			{/if}
		</header>
		<main>
			{#if enabled}
				{@render children()}
			{:else}
				<FocusCard>
					<div class="temp-announcement">
						<Stack size="1em">
							<p>Neolingo is under construction!</p>
							<p>Which means, you can't do much of anything just yet. But <em>eventually</em>, you'll be able to invent some new words!</p>
						</Stack>
					</div>
				</FocusCard>
			{/if}
		</main>
		<footer>
			<Stack size="0.75em">
				{#if enabled}
					<ul class="simple-link-list fancy-links max-spacing">
						<li><a href="/">Invent</a></li>
						<li><a href="/dictionary">Dictionary</a></li>
						<li><a href="/accessibility">Accessibility</a></li>
						<li><a href="/legal">Legal</a></li>
					</ul>
				{/if}
				<p><small>© Auroratide (Timothy Foster), All Rights Reserved.</small></p>
			</Stack>
		</footer>
	</Stack>
</Container>
<Notifier />

<style>
	main { width: 100%; }
	footer {
		width: 100%;
	}

	.simple-link-list {
		list-style: none;
		padding: 0 0.5em;
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.max-spacing {
		justify-content: space-between;
		gap: 1em;
	}

	.min-spacing {
		justify-content: center;
		gap: 1.5em;
	}

	.fancy-links a {
		text-decoration: none;
		display: inline-block;
		position: relative;

		&:hover { color: var(--color-u); }

		&::before, &::after {
			content: "";
			position: absolute;
			inset-inline: 0 0;
			height: 0.05em;
			background: currentColor;
			transition: inset-inline 0.25s ease-in-out;
		}

		&::before { inset-block-end: 0.2em; }
		&::after { inset-block-end: 0.15em; }

		&:hover::before, &:focus::before {
			inset-inline: 0 100%;
		}

		&:hover::after, &:focus::after {
			inset-inline: 100% 0;
		}

		@media (prefers-reduced-motion: reduce) {
			&::before, &::after { transition: none; }
		}
	}

	.temp-announcement {
		text-align: center;
		padding-block: 2em;
		font-size: 1.15em;
		white-space: balance;
	}
</style>
