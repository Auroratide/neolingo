<script lang="ts">
	import type { Snippet } from "svelte"
	import Container from "$lib/design-system/Container.svelte"
	import Stack from "$lib/design-system/Stack.svelte"
	import Notifier from "$lib/notifications/Notifier.svelte"
	import { page } from "$app/stores"
	import FocusCard from "$lib/design-system/FocusCard.svelte"
	import featureFlags from "$lib/feature-flags.svelte"
	import NavLinks from "$lib/design-system/NavLinks.svelte"
	import SkipLink from "$lib/design-system/SkipLink.svelte"

	type Props = { children: Snippet }
	const { children }: Props = $props()

	const isBetaPath = $derived($page.url.pathname.includes("beta"))
	const title = $derived($page.data.metadata.title)
	const pageTitle = $derived(`Neolingo | ${title === "Neolingo" ? "Invent a word" : title}`)
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content="Each day, invent a word for a concept that doesn't have a word yet!" />
	<meta name="og:site_name" content="Neolingo" />
	<meta name="og:title" content="Neolingo | Invent a word" />
	<meta name="og:type" content="website" />
	<meta name="og:image" content="https://neolingo.fun/logo.png" />
	<meta name="og:url" content="https://neolingo.fun" />
	<meta name="og:description" content="Each day, invent a word for a concept that doesn't have a word yet!" />
</svelte:head>
<Container>
	<Stack>
		<header>
			<h1>{title}</h1>
			<SkipLink href="#main">Skip to content</SkipLink>
			{#if featureFlags.enabled}
				<nav>
					<NavLinks values={[
						{ href: "/", text: "Invent" },
						{ href: "/dictionary", text: "Dictionary" },
					]} />
				</nav>
			{/if}
		</header>
		<main id="main">
			{#if featureFlags.enabled || isBetaPath}
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
			<Stack size="1em">
				{#if featureFlags.enabled}
					<NavLinks values={[
						{ href: "/", text: "Invent" },
						{ href: "/dictionary", text: "Dictionary" },
						{ href: "/accessibility", text: "Accessibility" },
						{ href: "/legal", text: "Legal" },
					]} />
				{/if}
				<Stack size="0.25em">
					<p><small>Made by <a href="https://auroratide.com">Auroratide</a>, mainly for fun <span class="inline-icon">♥</span> Source code on <a href="https://github.com/Auroratide/neolingo">Github</a></small></p>
					<p><small>© Auroratide (Timothy Foster), All Rights Reserved.</small></p>
				</Stack>
			</Stack>
		</footer>
	</Stack>
</Container>
<Notifier />

<style>
	header, main, footer { inline-size: 100%; }

	h1 { margin-block-end: 0.25em; }

	header, footer {
		text-align: center;
	}

	.temp-announcement {
		text-align: center;
		padding-block: 2em;
		font-size: 1.15em;
		white-space: balance;
	}

	.inline-icon {
		font-size: 0.75em;
		padding-inline: 0.5em;
	}
</style>
