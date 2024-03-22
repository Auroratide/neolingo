import { defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		env: {
			DB_URL: "postgresql://postgres:postgres@127.0.0.1:54322/postgres",
		},
		environment: "node",
		include: ["admin/**/*.{test,spec}.{js,ts}"],
	},
})
