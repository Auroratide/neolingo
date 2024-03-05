<div class="word-card stack" aria-hidden="true">
	<div class="skeleton large" style:--w="15ch"></div>
	<div class="skeleton" style:--w="100%"></div>
	<div class="skeleton" style:--w="50%"></div>
	<div class="skeleton small end space-bottom" style:--w="15ch"></div>
</div>

<style>
	.word-card {
		position: relative;
		background: var(--color-e);
		padding: 0.25em 0.75em;
		border: 0.25em solid var(--color-i);
		transition: border-color 0.25s ease-in-out;
		width: 100%;

		&::before, &::after {
			content: "";
			position: absolute;
			height: 0.25em;
			background: var(--color-a);
			pointer-events: none;
		}

		&::before {
			inset-block-start: 0.75em;
			inset-inline: 66% 0.75em;
		}

		&::after {
			inset-block-end: 0.75em;
			inset-inline: 0.75em 66%;
		}
	}

	.skeleton {
		height: 0.75em;
		margin-block: 0.125em;
		width: var(--w);
		background: linear-gradient(to right, var(--color-o) 30%, var(--color-u), var(--color-o) 70%);
		background-size: 300%;
		background-position-x: 0%;
		animation: shimmer 1s infinite ease;
		opacity: 0.25;
	}

	.large { font-size: 1.25em; }
	.small { font-size: 0.875em; }
	.end { align-self: flex-end; }
	.space-bottom { margin-block-end: 0.5em; }

	.stack {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	@keyframes shimmer {
		to { background-position-x: -150%; }
	}

	@media (prefers-reduced-motion: reduce) {
		.skeleton { animation: shimmer 10s infinite linear; }
	}
</style>
