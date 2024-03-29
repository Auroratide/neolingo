import type { PageLoad } from "./$types"
import { browser } from "$app/environment"

export const load: PageLoad = ({ url }) => {
	const topic = browser ? url.searchParams.get("topic") : null
	return {
		initialTopic: topic ? decodeURIComponent(topic) : "",
		metadata: {
			title: "Improve Neolingo",
		},
	}
}
