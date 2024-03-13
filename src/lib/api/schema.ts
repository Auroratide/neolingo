import type { OfficialWord, Prompt, SubmittedWord } from "$lib/domain"

export type PromptRow = {
	id: number
	day: string
	text: string
}
export function rowToPrompt(row: PromptRow): Prompt {
	return {
		id: row.id.toString(),
		text: row.text,
	}
}

export type WordRow = {
	id: number
	text: string
	tally: number
}
export function rowToWord(row: WordRow): SubmittedWord {
	return {
		id: row.id.toString(),
		text: row.text,
		tally: row.tally,
	}
}

export type DictionaryRow = {
	word: string
	definition: string
	day: string
}
export function rowToOfficialWord(row: DictionaryRow): OfficialWord {
	return {
		word: row.word,
		definition: row.definition,
		day: new Date(`${row.day}T00:00:00Z`),
	}
}
