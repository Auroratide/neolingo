import * as Api from "../api"
import type { Prompt } from "../domain"
import day from "../day.svelte"
import me from "../me.svelte"
import { storedState } from "$lib/stored-state"

export type PromptRune = {
	readonly content: Promise<Prompt>
	readonly myWord: string
	submitWord: (word: string) => Promise<void>
}

const GENERATED = "prompt:generated"
const CONTENT = "prompt:content"
const WORD = "prompt:word"

let prompt = $state<Promise<Prompt>>(new Promise(() => {}))
const myWord = storedState(WORD, "")

$effect.root(() => {
	$effect(() => {
		const lastGenerated = new Date(localStorage.getItem(GENERATED) ?? 0)
		const storedPrompt = localStorage.getItem(CONTENT)

		if (storedPrompt == null || !day.isToday(lastGenerated)) {
			prompt = Api.getPromptForToday().then((newPrompt) => {
				localStorage.setItem(GENERATED, new Date().toISOString())
				localStorage.setItem(CONTENT, JSON.stringify(newPrompt))
				myWord.value = ""
	
				return newPrompt
			})
		} else {
			prompt = Promise.resolve(JSON.parse(storedPrompt))
		}
	})
})

export default {
	get content() { return prompt },
	get myWord() { return myWord.value },
	submitWord: async (word: string) => {
		if (!me.id) {
			throw new Error("Could not submit word. Do you need to verify a captcha?")
		}

		await Api.submitWord(me.id, (await prompt).id, word)
		myWord.value = word
	},
} satisfies PromptRune
