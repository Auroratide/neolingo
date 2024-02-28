import type { Prompt } from "$lib/domain"

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