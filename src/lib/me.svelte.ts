import * as Api from "./api"
import type { UserId } from "./domain"
import { browser } from "$app/environment"

const ID_KEY = "me:id"

export type MeRune = {
	readonly id: Promise<UserId>
}

const id = new Promise<UserId>((resolve) => {
	if (!browser) return

	const storedId = localStorage.getItem(ID_KEY)

	if (storedId != null) {
		resolve(storedId)
	} else {
		Api.generateUserId().then((newId) => {
			localStorage.setItem(ID_KEY, newId)
			resolve(newId)
		})
	}
})

export default {
	get id() { return id },
} satisfies MeRune
