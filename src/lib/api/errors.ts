import type { PostgrestError } from "@supabase/supabase-js"

export function raiseError(error: PostgrestError | null, defaultMessage: string = "A mysterious error occurred."): never {
	if (error?.code === PostgresErrorCode.RaiseException) {
		if (error?.message.includes(" SOLUTION:")) {
			const [message, solution] = error.message.split(" SOLUTION:")
			throw new SolveableApiError(message, solution, error)
		} else {
			throw new ApiError(error.message ?? defaultMessage, error)
		}
	}

	if (error?.code === PostgresErrorCode.UniqueViolation) {
		if (error.message.includes("submissions_person_id_prompt_id_key")) {
			throw new SolveableApiError("You have already submitted a word for today!", "Return tomorrow to invent a new word.", error)
		}
	}

	if (error?.code === PostgresErrorCode.ForeignKeyViolation) {
		if (error.message.includes("word_matches_prompt")) {
			throw new SolveableApiError("Voted word was for a different prompt.", "Try refreshing the page.", error)
		} else if (error.details.includes("people")) {
			throw new SolveableApiError(defaultMessage, "Try clearing your browser history for this site and refreshing the page.", error)
		} else if (error.details.includes("prompts")) {
			throw new SolveableApiError("Could not find prompt.", "Try refreshing the page.", error)
		} else if (error.details.includes("words")) {
			throw new SolveableApiError("Could not find word.", "Try refreshing the page.", error)
		}
	}

	if (error?.code === PostgresErrorCode.CheckViolation) {
		if (error.message.includes("only_lowercase_letters")) {
			throw new SolveableApiError("Word must contain only letters.", "Ensure your word contains only letters.", error)
		}
	}

	throw new ApiError(defaultMessage, error)
}

export class ApiError extends Error {
	constructor(message: string, readonly cause?: unknown) {
		super(message)
	}
}

export class SolveableApiError extends ApiError {
	constructor(message: string, readonly solution: string, cause?: unknown) {
		super(message, cause)
	}
}

const PostgresErrorCode = {
	RaiseException: "P0001",
	ForeignKeyViolation: "23503",
	UniqueViolation: "23505",
	CheckViolation: "23514",
} as const
