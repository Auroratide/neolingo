import type { PageLoad } from "./$types"

export const load: PageLoad = ({ url }) => {
	const topic = url.searchParams.get("topic")
	return {
		initialTopic: topic ? decodeURIComponent(topic) : "",
		metadata: {
			title: "Improve Neolingo",
		},
	}
}
