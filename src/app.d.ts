// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Window {
		turnstile: {
			render: (selector: string, options: {
				sitekey: string,
				callback: (token: string) => void,
			}) => string,
			remove: (id: string) => void,
		},
	}
}

export {}
