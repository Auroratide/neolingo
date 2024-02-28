import * as Api from "./api"
import type { MyId } from "./domain"
import { browser } from "$app/environment"

const ID_KEY = "me:id"

export type MeRune = {
	readonly id: Promise<MyId>
}

const id = new Promise<MyId>((resolve) => {
	if (!browser) return

	const storedId = localStorage.getItem(ID_KEY)

	if (storedId != null) {
		resolve(storedId)
	} else {
		Api.generateMyId().then((newId) => {
			localStorage.setItem(ID_KEY, newId)
			resolve(newId)
		})
	}
})

export default {
	get id() { return id },
} satisfies MeRune
