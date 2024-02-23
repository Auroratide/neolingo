import * as Api from "./api"
import type { Prompt } from "./domain"
import day from "./day.svelte"
import me from "./me.svelte"

export type PromptRune = {
	readonly content: Promise<Prompt>
	readonly myWord: string
	submitWord: (word: string) => Promise<void>
}

const PROMPT_GENERATED = "prompt:generated"
const PROMPT_CONTENT = "prompt:content"
const PROMPT_WORD = "prompt:word"

let prompt = $state<Promise<Prompt>>(new Promise(() => {}))
let myWord = $state("")

$effect.root(() => {
	$effect(() => {
		const lastGenerated = new Date(localStorage.getItem(PROMPT_GENERATED) ?? 0)
		const storedPrompt = localStorage.getItem(PROMPT_CONTENT)
		// const storedPrompt = null

		if (storedPrompt == null || !day.isToday(lastGenerated)) {
			prompt = Api.getPromptForToday().then((newPrompt) => {
				localStorage.setItem(PROMPT_GENERATED, new Date().toISOString())
				localStorage.setItem(PROMPT_CONTENT, JSON.stringify(newPrompt))
				localStorage.removeItem(PROMPT_WORD)
				myWord = ""
	
				return newPrompt
			})
		} else {
			prompt = Promise.resolve(JSON.parse(storedPrompt))
			myWord = localStorage.getItem(PROMPT_WORD) ?? ""
		}
	})
})

export default {
	get content() { return prompt },
	get myWord() { return myWord },
	submitWord: async (word: string) => {
		await Api.submitWord(await me.id, word)
		localStorage.setItem(PROMPT_WORD, word)
	},
} satisfies PromptRune
