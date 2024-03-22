import pg from "pg"
import { parse } from "csv-parse/sync"
import * as fs from "node:fs/promises"

const { Client } = pg

export async function addAllPrompts(dbUrl: string, csvFile: string): Promise<number> {
	const db = new Client(dbUrl)

	try {
		const csvRaw = await fs.readFile(csvFile, "utf-8")
		const csvTable = parse(csvRaw, { columns: false })

		await db.connect()
		const latestDay = await db.query("SELECT day FROM private.prompts ORDER BY day DESC LIMIT 1")
			.then((res) => res.rows[0]?.day.toISOString() ?? "1970-01-01")

		await db.query(...insertMany({
			table: "private.prompts",
			columns: ["text", "day"],
			values: csvTable.map((row) => ({
				day: row[0],
				text: row[1],
			})).filter((row) => row.day > latestDay),
		}))

		return csvTable.length
	} finally {
		db.end()
	}
}

export interface InsertManyOptions<TKeys extends string> {
	table: string
	columns: readonly TKeys[]
	values: Array<{ [K in TKeys]: unknown }>
}

function dollarParameterNumbers(
	values: unknown[],
	columns: readonly unknown[],
): string {
	return values.map((_, i) => "(" +
		columns
			.map((_, j) => `$${i * columns.length + j + 1}`)
			.join(", ") +
	")").join(", ")
}

function insertMany<TKeys extends string>({
	table,
	columns,
	values,
}: InsertManyOptions<TKeys>): [string, unknown[]] {
	const columnNames = columns.join(", ")
	const parameterNames =
		values.length === 0 ? "()" : dollarParameterNumbers(values, columns)

	const sql = `INSERT INTO ${table} (${columnNames}) VALUES ${parameterNames};`
	const parameters = values.flatMap((v) => columns.map((c) => v[c]))

	return [sql, parameters]
}

