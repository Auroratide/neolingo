import * as Api from "./api"
import type { Word, WordId } from "./domain"
import prompt from "./prompt.svelte"
import day from "./day.svelte"
import me from "./me.svelte"

export type VotesRune = {
	readonly list: Promise<readonly Word[]>
	readonly myVote: WordId | undefined
	submitVote: (wordId: WordId) => Promise<void>
}

const GENERATED = "votes:generated"
const CONTENT = "votes:content"
const MY_VOTE = "votes:my-vote"

let words = $state<Promise<readonly Word[]>>(new Promise(() => {}))
let myVote = $state<WordId | undefined>(undefined)

$effect.root(() => {
	$effect(() => {
		const lastGenerated = new Date(localStorage.getItem(GENERATED) ?? 0)
		const storedList = localStorage.getItem(CONTENT)

		if (storedList == null || !day.isToday(lastGenerated)) {
			words = Api.getVotableWords().then((newWords) => {
				localStorage.setItem(GENERATED, new Date().toISOString())
				localStorage.setItem(CONTENT, JSON.stringify(newWords))
				localStorage.removeItem(MY_VOTE)
				myVote = undefined
	
				return newWords
			})
		} else {
			words = Promise.resolve(JSON.parse(storedList))
			myVote = localStorage.getItem(MY_VOTE) ?? undefined
		}
	})
})

export default {
	get list() { return words },
	get myVote() { return myVote },
	submitVote: async (wordId: WordId) => {
		await Api.submitVote(await me.id, (await prompt.content).id, wordId)
		localStorage.setItem(MY_VOTE, wordId)
	},
} satisfies VotesRune
