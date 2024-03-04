import type { Prompt, Word } from "$lib/domain"

export type PromptRow = {
	id: number
	day: string
	text: string
	letters: number
}
export function rowToPrompt(row: PromptRow): Prompt {
	return {
		id: row.id.toString(),
		text: row.text,
		letters: row.letters,
	}
}

export type WordRow = {
	id: number
	text: string
	tally: number
}
export function rowToWord(row: WordRow): Word {
	return {
		id: row.id.toString(),
		text: row.text,
		tally: row.tally,
	}
}
