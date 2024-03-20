import * as Api from "../api"
import type { SubmittedWord, SubmittedWordId } from "$lib/domain"
import prompt from "$lib/prompt/prompt.svelte"
import day from "$lib/day.svelte"
import me from "$lib/me/me.svelte"
import { chooseWords } from "./choose-words"
import { storedState } from "$lib/stored-state"

export const WORDS_TO_CHOOSE = 3

export type VotesRune = {
	readonly allWords: Promise<readonly SubmittedWord[]>
	readonly votableWords: readonly SubmittedWord[]
	readonly myVote: SubmittedWordId | undefined
	readonly specificWord: SubmittedWord | undefined
	submitVote: (wordId: SubmittedWordId) => Promise<void>
	replaceWord: (index: number) => Promise<void>
	findSpecificWord: (text: string) => Promise<SubmittedWord | undefined>
}

const GENERATED = "votes:generated"
const VOTABLE = "votes:votable"
const MY_VOTE = "votes:my-vote"
const SPECIFIC_WORD = "votes:specific-word"

let allWords = $state<Promise<readonly SubmittedWord[]>>(new Promise(() => {}))
const votableWords = storedState<readonly SubmittedWord[]>(VOTABLE, [])
const myVote = storedState<SubmittedWordId | undefined>(MY_VOTE, undefined)
const specificWord = storedState<SubmittedWord | undefined>(SPECIFIC_WORD, undefined)

$effect.root(() => {
	$effect(() => {
		const lastGenerated = new Date(localStorage.getItem(GENERATED) ?? 0)

		if (!day.isToday(lastGenerated)) {
			myVote.value = undefined
			specificWord.value = undefined

			allWords = Api.getVotableWords().then(reset)
		} else {
			allWords = Api.getVotableWords()
		}
	})
})

async function reset(newWords: readonly SubmittedWord[]) {
	localStorage.setItem(GENERATED, new Date().toISOString())

	votableWords.value = chooseWords(newWords, WORDS_TO_CHOOSE)

	return newWords
}

async function submitVote(id: SubmittedWordId) {
	if (!me.id) {
		throw new Error("Could not submit word. Do you need to verify a captcha?")
	}

	await Api.submitVote(me.id, (await prompt.content).id, id)
	myVote.value = id
}

async function replaceWord(index: number) {
	const currentAllWords = await allWords
	const votableWordIds = votableWords.value.map((word) => word.id)
	const wordsToChooseFrom = currentAllWords.filter((word) =>
		!votableWordIds.includes(word.id) && word.text !== prompt.myWord,
	)

	const newWord = chooseWords(wordsToChooseFrom, 1)[0]

	if (newWord != null) {
		votableWords.value = votableWords.value.toSpliced(index, 1, newWord)
	}
}

async function findSpecificWord(text: string): Promise<SubmittedWord | undefined> {
	const currentAllWords = await allWords
	const found = currentAllWords.find((word) => word.text === text)
	if (found != null && found.text != prompt.myWord)
		specificWord.value = found

	return found
}

export default {
	get allWords() { return allWords },
	get votableWords() { return votableWords.value },
	get myVote() { return myVote.value },
	get specificWord() { return specificWord.value },
	submitVote,
	replaceWord,
	findSpecificWord,
} satisfies VotesRune
