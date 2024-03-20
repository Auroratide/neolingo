import * as Api from "./api"
import type { MyId } from "./domain"
import { storedState } from "./stored-state"

const ID_KEY = "me:id"

export type MeRune = {
	readonly id: MyId | undefined
	generateId: (token: string) => Promise<MyId>
}

const id = storedState<MyId | undefined>(ID_KEY, undefined)

export default {
	get id() { return id.value },
	generateId: async (token: string) => {
		return Api.generateMyId(token).then((newId) => {
			id.value = newId
			return newId
		})
	},
} satisfies MeRune
