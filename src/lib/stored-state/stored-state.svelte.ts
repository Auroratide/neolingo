export function storedState<T>(key: string, initialValue: T): {
	get value(): T
	set value(v: T)
} {
	const currentValue = get<T>(key) ?? initialValue
	set(key, currentValue)

	let v = $state(currentValue)

	return {
		get value() { return v },
		set value(newValue: T) {
			set(key, newValue)
			v = newValue
		},
	}
}

function get<T>(key: string): T | undefined {
	if (!canUseLocalStorage) return undefined

	const itemInStorage = localStorage.getItem(key)
	if (itemInStorage != null) {
		try {
			return JSON.parse(itemInStorage) as T
		} catch (e) {
			localStorage.removeItem(key)
		}
	}

	return undefined
}

function set<T>(key: string, newValue: T) {
	if (!canUseLocalStorage) return

	if (newValue != null) {
		localStorage.setItem(key, JSON.stringify(newValue))
	} else {
		localStorage.removeItem(key)
	}
}

const canUseLocalStorage = (() => {
	if (typeof window === "undefined") return false

	const test = "test-localstorage"

	try {
		localStorage.setItem(test, test)
		localStorage.removeItem(test)
		return true
	} catch (e) {
		return false
	}
})()
