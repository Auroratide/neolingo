import { defineConfig, devices } from "@playwright/test"

const PORT = 3000

export default defineConfig({
	testDir: "./src/routes/test",
	outputDir: "./.playwright/results",
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	reporter: [["html", { open: "never", outputFolder: "./.playwright/report" }]],
	use: {
		baseURL: `http://localhost:${PORT}`,
		screenshot: "only-on-failure",
		headless: true,
	},
	projects: [ {
		name: "chromium",
		use: { ...devices["Desktop Chrome"] },
	} ],
	webServer: {
		command: "pnpm build && pnpm preview",
		port: PORT,
		reuseExistingServer: !process.env.CI,
	},
})
