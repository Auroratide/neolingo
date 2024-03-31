import * as Api from "../api"
import type { SubmittedWord, SubmittedWordId } from "$lib/domain"
import prompt from "$lib/prompt/prompt.svelte"
import day from "$lib/day.svelte"
import me from "$lib/me/me.svelte"
import { chooseWords } from "./choose-words"
import { storedState } from "$lib/stored-state"

export const WORDS_TO_CHOOSE = 5

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
const SEEN_WORDS = "votes:seen-words"

let allWords = $state<Promise<readonly SubmittedWord[]>>(new Promise(() => {}))
const votableWords = storedState<readonly SubmittedWord[]>(VOTABLE, [])
const myVote = storedState<SubmittedWordId | undefined>(MY_VOTE, undefined)
const specificWord = storedState<SubmittedWord | undefined>(SPECIFIC_WORD, undefined)
const seenWords = storedState<SubmittedWordId[]>(SEEN_WORDS, [])

$effect.root(() => {
	$effect(() => {
		const lastGenerated = new Date(localStorage.getItem(GENERATED) ?? 0)

		if (!day.isToday(lastGenerated)) {
			myVote.value = undefined
			specificWord.value = undefined
			seenWords.value = []

			allWords = Api.getVotableWords().then(reset)
		} else {
			allWords = Api.getVotableWords().then(addWordsIfNeeded)
		}
	})
})

async function reset(newWords: readonly SubmittedWord[]) {
	localStorage.setItem(GENERATED, new Date().toISOString())

	votableWords.value = chooseWords(newWords, WORDS_TO_CHOOSE)
	seenWords.value = votableWords.value.map((word) => word.id)

	return newWords
}

async function addWordsIfNeeded(newWords: readonly SubmittedWord[]) {
	if (votableWords.value.length < WORDS_TO_CHOOSE) {
		const numberOfNeededWords = WORDS_TO_CHOOSE - votableWords.value.length
		const moreVotableWords = chooseWords(newWords.filter(isVotableWord), numberOfNeededWords)
		votableWords.value = [...votableWords.value, ...moreVotableWords]
		seenWords.value = [...seenWords.value, ...moreVotableWords.map((word) => word.id)]
	}

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
	let wordsToChooseFrom = currentAllWords.filter(isVotableWord)
	if (wordsToChooseFrom.length === 0) {
		seenWords.value = votableWords.value.map((word) => word.id)
		wordsToChooseFrom = currentAllWords.filter(isVotableWord)
	}

	const newWord = chooseWords(wordsToChooseFrom, 1)[0]

	if (newWord != null) {
		votableWords.value = votableWords.value.toSpliced(index, 1, newWord)
		seenWords.value = [...seenWords.value, newWord.id]
	}
}

async function findSpecificWord(text: string): Promise<SubmittedWord | undefined> {
	if (text === "") {
		specificWord.value = undefined
		return undefined
	}

	const currentAllWords = await allWords
	const found = currentAllWords.find((word) => word.text === text)
	if (found != null && found.text != prompt.myWord)
		specificWord.value = found
	else
		specificWord.value = undefined

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

const votableWordIds = $derived(votableWords.value.map((word) => word.id))
function isVotableWord(word: SubmittedWord): boolean {
	return !votableWordIds.includes(word.id)
		&& word.text !== prompt.myWord
		&& word.text !== specificWord.value?.text
		&& !seenWords.value.includes(word.id)
}
