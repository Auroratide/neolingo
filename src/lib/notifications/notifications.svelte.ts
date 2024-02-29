type BaseNotification<Type extends string, Content> = {
	readonly id: string
	readonly title: string
	readonly type: Type
	readonly content: Content
	readonly dismiss: () => void
}

export type NormieNotification = BaseNotification<"normie", {
	readonly message: string
}>
export type ErrorNotification = BaseNotification<"error", Error & {
	readonly solution?: string
}>

export type Notification = NormieNotification | ErrorNotification

export type NotificationsRune = {
	readonly list: readonly Notification[]
	normie: (title: string, message: string) => void
	error: (error: Error) => void
}

let notifications = $state<Notification[]>([])

const uniqueId = () => Math.random().toString(36).slice(2)

const normie = (title: string, message: string): void => {
	const id = uniqueId()
	const dismiss = () => {
		notifications = notifications.filter((e) => e.id !== id)
	}

	notifications = [...notifications, {
		id,
		title: title,
		type: "normie",
		content: { message },
		dismiss,
	}]

}

const error = (e: Error): void => {
	const id = uniqueId()
	const dismiss = () => {
		notifications = notifications.filter((e) => e.id !== id)
	}

	notifications = [...notifications, {
		id,
		title: "Something went wrong...",
		type: "error",
		content: e,
		dismiss,
	}]
}

export default {
	get list() { return notifications },
	normie,
	error,
} satisfies NotificationsRune
