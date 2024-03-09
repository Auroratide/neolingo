<script lang="ts">
	import type { SubmittedWord } from "$lib/domain"
	import WordVoter from "$lib/votes/WordVoter.svelte"

	let currentId = 6

	let words = $state<SubmittedWord[]>([{
		id: "1",
		text: "one",
		tally: 0,
	}, {
		id: "2",
		text: "two",
		tally: 0,
	}, {
		id: "3",
		text: "three",
		tally: 0,
	}, {
		id: "4",
		text: "four",
		tally: 0,
	}, {
		id: "5",
		text: "five",
		tally: 0,
	}, {
		id: "6",
		text: "six",
		tally: 0,
	}])

	let currentWord = $state("")

	const onreplaceword = (index: number) => {
		words = words.toSpliced(index, 1, {
			id: (++currentId).toString(),
			text: "replaced",
			tally: 0,
		})
	}
</script>

<WordVoter id="sandbox-voter" {words} bind:value={currentWord} {onreplaceword} />
