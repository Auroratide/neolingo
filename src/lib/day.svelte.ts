import { isSameDay, msUntilNextDay } from "./domain"

export type DayRune = {
	isToday: (other: Date) => boolean,
}

let day = $state<Date>(new Date())

$effect.root(() => {
	let timeout = -1
	const reset = () => {
		day = new Date()

		timeout = window.setTimeout(reset, msUntilNextDay(day) + 500)
	}

	reset()

	return () => clearTimeout(timeout)
})

export default {
	isToday: (other: Date) => isSameDay(day, other),
} satisfies DayRune
