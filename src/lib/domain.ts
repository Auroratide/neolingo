export type MyId = string

export type PromptId = string
export type Prompt = {
	readonly id: PromptId
	readonly text: string
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

const PST = -8 // ignore daylight savings time
export function getDayOf(date: Date): string {
	const pacificDate = new Date(date)
	pacificDate.setUTCHours(pacificDate.getUTCHours() + PST)
	return pacificDate.toISOString().split("T")[0]
}

export function isSameDay(a: Date, b: Date) {
	return getDayOf(a) === getDayOf(b)
}

export function msUntilNextDay(fromDate: Date): number {
	const nextDay = new Date(fromDate)
	nextDay.setUTCDate(fromDate.getUTCDate() + 1)
	nextDay.setUTCHours(-PST, 0, 0, 0)

	return nextDay.getTime() - fromDate.getTime()
}
