import { describe, test, expect, beforeEach, afterEach, vi } from "vitest"
import { storedState } from "./stored-state.svelte"

type Person = {
	name: string
	age: number
}

const Winter = { name: "Winter", age: 19 }
const Autumn = { name: "Autumn", age: 17 }

describe("storedState", () => {
	beforeEach(() => {
		localStorage.clear()
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	test("no initial state", () => {
		const result = storedState("key", Winter)

		expect(result.value).toEqual(Winter)
	})

	test("setting state", () => {
		const result = storedState("key", Winter)

		result.value = Autumn
		expect(result.value).toEqual(Autumn)

		// pretend refresh happened; Autumn was persisted
		const newResult = storedState("key", Winter)
		expect(newResult.value).toEqual(Autumn)
	})

	test("setting to undefined", () => {
		const result = storedState<Person | undefined>("key", Winter)
		result.value = undefined

		expect(result.value).toBeUndefined()
	})

	test("localStorage has some unparseable string", () => {
		localStorage.setItem("key", "not json")

		const result = storedState("key", Winter)
		expect(result.value).toEqual(Winter)
	})
})
