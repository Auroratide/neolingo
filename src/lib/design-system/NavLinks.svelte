<script lang="ts">
	type Props = {
		values: { href: string; text: string }[],
	}; const {
		values,
	}: Props = $props()
</script>

<ul class="no-list row top-bottom-border">
	{#each values as { href, text } (href)}
		<li>
			<a class="block-link border-highlight" {href}>{text}</a>
		</li>
	{/each}
</ul>

<style>
	.no-list {
		list-style: none;
		padding: 0;
	}

	.row {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		inline-size: 100%;
		justify-content: center;
		column-gap: 1em;
		row-gap: 0.125em;
		align-items: center;
		text-align: center;
	}

	.top-bottom-border {
		border-block: 0.125em solid var(--color-i);
	}

	.block-link {
		display: block;
		padding-block: 0.25em;
		padding-inline: 1em;
	}

	.block-link:hover,
	.block-link:focus {
		color: var(--color-u);
	}

	.border-highlight {
		position: relative;
		text-decoration: none;

		&::before, &::after {
			content: "";
			position: absolute;
			inset-inline: 0 0;
			height: 0.125em;
			background: var(--color-o);
			transition: inset-inline 0.25s ease-in-out;
		}

		&::before {
			inset-block-start: -0.125em;
			inset-inline: 100% 0;
		}
		&::after {
			inset-block-end: -0.125em;
			inset-inline: 0 100%;
		}

		&:hover::before, &:focus::before,
		&:hover::after, &:focus::after {
			inset-inline: 0 0;
		}

		@media (prefers-reduced-motion: reduce) {
			&::before, &::after { transition: none; }
		}
	}
</style>