/* eslint-disable no-console */
import * as path from "node:path"
import { addAllPrompts } from "."

const dbUrl = process.env.DB_URL!
const csvFile = path.join(import.meta.dirname, "..", "prompts.prod.csv")

const numberAdded = await addAllPrompts(dbUrl, csvFile)
console.log(`Added ${numberAdded} prompts.`)
