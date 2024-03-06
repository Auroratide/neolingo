import * as Api from "./api"
import type { Prompt } from "./domain"
import day from "./day.svelte"
import me from "./me.svelte"

export type PromptRune = {
	readonly content: Promise<Prompt>
	readonly myWord: string
	submitWord: (word: string) => Promise<void>
}

const GENERATED = "prompt:generated"
const CONTENT = "prompt:content"
const WORD = "prompt:word"

let prompt = $state<Promise<Prompt>>(new Promise(() => {}))
let myWord = $state("")

$effect.root(() => {
	$effect(() => {
		const lastGenerated = new Date(localStorage.getItem(GENERATED) ?? 0)
		const storedPrompt = localStorage.getItem(CONTENT)

		if (storedPrompt == null || !day.isToday(lastGenerated)) {
			prompt = Api.getPromptForToday().then((newPrompt) => {
				localStorage.setItem(GENERATED, new Date().toISOString())
				localStorage.setItem(CONTENT, JSON.stringify(newPrompt))
				localStorage.removeItem(WORD)
				myWord = ""
	
				return newPrompt
			})
		} else {
			prompt = Promise.resolve(JSON.parse(storedPrompt))
			myWord = localStorage.getItem(WORD) ?? ""
		}
	})
})

export default {
	get content() { return prompt },
	get myWord() { return myWord },
	submitWord: async (word: string) => {
		await Api.submitWord(await me.id, (await prompt).id, word)
		myWord = word
		localStorage.setItem(WORD, word)
	},
} satisfies PromptRune
