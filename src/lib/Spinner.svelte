<script lang="ts">
	type Props = {
		label: string
	}; const {
		label,
	} = $props<Props>()
</script>

<div class="spinner">
	<div class="line"></div>
	<div class="line" style:--delay="-0.67s"></div>
	<div class="line" style:--delay="-0.33s"></div>
	<p class="animated-ellipses">{label}</p>
</div>

<style>
	.spinner {
		text-align: center;
		max-width: 15em;
		margin: auto;
		display: flex;
		flex-direction: column;
		gap: 0.25em;
		padding: 0.75em;
		background: var(--color-e);
		border: 0.25em solid var(--color-i);
	}

	.line {
		position: relative;
		width: 50%;
		margin: auto;
		height: 0.2em;
		opacity: 0.667;

		&::before {
			display: inline-block;
			position: absolute;
			content: "";
			background: var(--color-o);
			inset-block: 0;
			animation: back-and-forth 1s infinite alternate ease-in-out;
			animation-delay: var(--delay, 0s);
		}

		&:last-of-type {
			margin-block-end: 0.375em;
		}
	}

	p { opacity: 0.9; }

	.animated-ellipses::after {
		content: ".\00a0\00a0";
		animation: ellipses-right 2s infinite steps(3);
	}

	@keyframes back-and-forth {
		0% { inset-inline: 0.5em 85%; }
		50% { inset-inline: 15% 15%; }
		100% { inset-inline: 85% 0.5em; }
	}

	@keyframes ellipses-right {
		0%, 100% { content: ".\00a0\00a0"; }
		33% { content: "..\00a0"; }
		66% { content: "..."; }
	}

	@media (prefers-reduced-motion: reduce) {
		.animated-ellipses::after { animation: none; content: "..."; }
		.line::before { animation: none; }
	}
</style>