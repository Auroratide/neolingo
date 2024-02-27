import type { Prompt, UserId, Word, WordId } from "./domain"

async function simulateLatency(sec: number = 0.8) {
	return new Promise(resolve => {
		setTimeout(resolve, sec * 1000)
	})
}

function fakeId() {
	return "fake." + Math.random().toString(36).substring(2)
}

export async function generateUserId(): Promise<UserId> {
	await simulateLatency()
	
	return fakeId()
}

export async function getPromptForToday(): Promise<Prompt> {
	await simulateLatency()

	return {
		id: fakeId(),
		text: "a hike or journey taken during the transition from night to dawn",
		letters: 6,
	}
}

export async function submitWord(myId: UserId, myWord: string): Promise<void> {
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

export async function submitVote(myId: UserId, myVote: WordId): Promise<void> {
	await simulateLatency()

	alert(`You (${myId}) voted: ${myVote}`)
}
