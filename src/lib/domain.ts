export type MyId = string

export type PromptId = string
export type Prompt = {
	readonly id: PromptId
	readonly text: string
	readonly letters: number
}

export type SubmittedWordId = string
export type SubmittedWord = {
	readonly id: SubmittedWordId
	readonly text: string
	readonly tally: number
}

export type OfficialWord = {
	readonly word: string
	readonly definition: string
	readonly day: Date
}

export function isSameDay(a: Date, b: Date) {
	return a.getUTCFullYear() === b.getUTCFullYear()
		&& a.getUTCMonth() === b.getUTCMonth()
		&& a.getUTCDate() === b.getUTCDate()
}

export function msUntilNextDay(fromDate: Date): number {
	const nextDay = new Date(fromDate)
	nextDay.setUTCDate(fromDate.getUTCDate() + 1)
	nextDay.setUTCHours(0, 0, 0, 0)

	return nextDay.getTime() - fromDate.getTime()
}
