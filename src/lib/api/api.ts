import type { Prompt, MyId, Word, WordId } from "../domain"
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from "$env/static/public"
import { createClient } from "@supabase/supabase-js"
import { type PromptRow, rowToPrompt } from "./schema"

const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY)

async function simulateLatency(sec: number = 0.8) {
	return new Promise(resolve => {
		setTimeout(resolve, sec * 1000)
	})
}

function fakeId() {
	return "fake." + Math.random().toString(36).substring(2)
}

export async function generateMyId(): Promise<MyId> {
	return await supabase.rpc("generate_new_person")
		.maybeSingle<string>()
		.then(({ data, error }) => {
			if (error != null || data == null) {
				throw new ApiError("Failed to generate new person", error)
			}

			return data
		})
}

export async function getPromptForToday(): Promise<Prompt> {
	return await supabase.rpc("get_prompt_for_today")
		.maybeSingle<PromptRow>()
		.then(({ data, error }) => {
			if (error != null || data == null) {
				throw new ApiError("Failed to get prompt", error)
			}

			return rowToPrompt(data)
		})
}

export async function submitWord(myId: MyId, myWord: string): Promise<void> {
	await simulateLatency()

	alert(`You (${myId}) submitted: ${myWord}`)
}

export async function getWordsToVoteFor(): Promise<readonly Word[]> {
	await simulateLatency()

	return [
		{ id: fakeId(), text: "nihike" },
		{ id: fakeId(), text: "dawalk" },
		{ id: fakeId(), text: "wailke" },
		{ id: fakeId(), text: "plumor" },
	]
}

export async function submitVote(myId: MyId, myVote: WordId): Promise<void> {
	await simulateLatency()

	alert(`You (${myId}) voted: ${myVote}`)
}

class ApiError extends Error {
	constructor(message: string, readonly cause?: unknown) {
		super(message)
	}
}
