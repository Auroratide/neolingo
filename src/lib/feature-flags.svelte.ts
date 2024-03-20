import { storedState } from "$lib/stored-state"
import { PUBLIC_ENABLED } from "$env/static/public"

const BETA_KEY = "feature-flag:beta"

export type FeatureFlagsRune = {
	readonly enabled: boolean
	enable: () => void
}

const beta = storedState<boolean>(BETA_KEY, false)

export default {
	get enabled() { return PUBLIC_ENABLED === "true" || beta.value },
	enable: () => { beta.value = true },
} satisfies FeatureFlagsRune
