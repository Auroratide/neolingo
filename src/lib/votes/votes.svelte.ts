import * as Api from "../api"
import type { SubmittedWord, SubmittedWordId } from "$lib/domain"
import prompt from "$lib/prompt/prompt.svelte"
import day from "$lib/day.svelte"
import me from "$lib/me.svelte"
import { chooseWords } from "./choose-words"

export const WORDS_TO_CHOOSE = 3

export type VotesRune = {
	readonly allWords: Promise<readonly SubmittedWord[]>
	readonly votableWords: Promise<readonly SubmittedWord[]>
	readonly myVote: SubmittedWordId | undefined
	submitVote: (wordId: SubmittedWordId) => Promise<void>
	replaceWord: (index: number) => Promise<void>
}

const GENERATED = "votes:generated"
const VOTABLE = "votes:votable"
const MY_VOTE = "votes:my-vote"

let allWords = $state<Promise<readonly SubmittedWord[]>>(new Promise(() => {}))
let votableWords = $state<Promise<readonly SubmittedWord[]>>(new Promise(() => {}))
let myVote = $state<SubmittedWordId | undefined>(undefined)

$effect.root(() => {
	$effect(() => {
		const lastGenerated = new Date(localStorage.getItem(GENERATED) ?? 0)

		if (!day.isToday(lastGenerated)) {
			localStorage.removeItem(MY_VOTE)
			myVote = undefined

			allWords = Api.getVotableWords().then((newWords) => {
				localStorage.setItem(GENERATED, new Date().toISOString())

				votableWords = Promise.resolve(chooseWords(newWords, WORDS_TO_CHOOSE)).then((votableWords) => {
					localStorage.setItem(VOTABLE, JSON.stringify(votableWords))
					return votableWords
				})
					
				return newWords
			}).catch((e) => {
				votableWords = Promise.reject(e)
				throw e
			})
		} else {
			allWords = Api.getVotableWords()
			votableWords = Promise.resolve(JSON.parse(localStorage.getItem(VOTABLE) ?? "[]"))
			myVote = localStorage.getItem(MY_VOTE) ?? undefined
		}
	})
})

async function submitVote(id: SubmittedWordId) {
	await Api.submitVote(await me.id, (await prompt.content).id, id)
	myVote = id
	localStorage.setItem(MY_VOTE, id)
}

async function replaceWord(index: number) {
	const currentAllWords = await allWords
	const currentVotableWords = await votableWords
	const wordToReplace = currentVotableWords[index]
	const wordsToChooseFrom = currentAllWords.filter((word) => word.id !== wordToReplace.id)

	const newWord = chooseWords(wordsToChooseFrom, 1)[0]

	votableWords = Promise.resolve(currentVotableWords.toSpliced(index, 1, newWord))
}

export default {
	get allWords() { return allWords },
	get votableWords() { return votableWords },
	get myVote() { return myVote },
	submitVote,
	replaceWord,
} satisfies VotesRune
