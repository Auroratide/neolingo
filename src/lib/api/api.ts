import type { Prompt, MyId, SubmittedWord, SubmittedWordId, PromptId, OfficialWord } from "../domain"
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from "$env/static/public"
import { createClient } from "@supabase/supabase-js"
import { type PromptRow, rowToPrompt, rowToWord, rowToOfficialWord, type DictionaryRow } from "./schema"
import { raiseError } from "./errors"

const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY)

export async function generateMyId(token: string): Promise<MyId> {
	return await supabase.functions.invoke("generate-my-id", {
		body: { token },
	}).then(({ data, error }) => {
		if (error != null || data == null) {
			raiseError(error, "I could not do what you wanted. Do you need to verify a captcha?")
		}

		return data.id
	})
}

export async function getPromptForToday(): Promise<Prompt> {
	return await supabase.rpc("get_prompt_for_today")
		.maybeSingle<PromptRow>()
		.then(({ data, error }) => {
			if (error != null || data == null) {
				raiseError(error, "Failed to get prompt.")
			}

			return rowToPrompt(data)
		})
}

export async function submitWord(myId: MyId, promptId: PromptId, myWord: string): Promise<void> {
	await supabase.rpc("submit_word", { _my_id: myId, _prompt_id: promptId, _word: myWord }).then(({ error }) => {
		if (error != null) {
			raiseError(error, "Failed to submit word.")
		}
	})
}

export async function getVotableWords(): Promise<readonly SubmittedWord[]> {
	return await supabase.rpc("get_votable_words")
		.then(({ data, error }) => {
			if (error != null || data == null) {
				raiseError(error, "Failed to get votable words.")
			}

			return data.map(rowToWord)
		})
}

export async function submitVote(myId: MyId, promptId: PromptId, myVote: SubmittedWordId): Promise<void> {
	await supabase.rpc("submit_vote", { _my_id: myId, _prompt_id: promptId, _word_id: myVote }).then(({ error }) => {
		if (error != null) {
			raiseError(error, "Failed to submit vote.")
		}
	})
}

export async function getDictionary(): Promise<OfficialWord[]> {
	return await supabase.rpc("get_dictionary")
		.then(({ data, error }) => {
			if (error != null || data == null) {
				raiseError(error, "Failed to get dictionary.")
			}

			return data.map(rowToOfficialWord)
		})
}

export async function getLastWord(): Promise<OfficialWord> {
	return await supabase.rpc("get_last_word")
		.maybeSingle<DictionaryRow>()
		.then(({ data, error }) => {
			if (error != null || data == null) {
				raiseError(error, "Failed to get last word.")
			}

			return rowToOfficialWord(data)
		})
}

export async function submitFeedback(token: string, feedback: {
	topic: string,
	text: string,
}): Promise<void> {
	return await supabase.functions.invoke("submit-feedback", {
		body: {
			token,
			payload: feedback,
		},
	}).then(async ({ error }) => {
		if (error != null) {
			if (error.context.status === 403) {
				raiseError(error, "I could not submit your feedback. Do you need to verify a captcha?")
			}

			if (error.context.status === 400) {
				const body = await error.context.json()
				raiseError(error, `I could not submit your feedback. ${body.message}`)
			}

			raiseError(error, "I could not submit your feedback, and I don't know why.")
		}
	})
}
