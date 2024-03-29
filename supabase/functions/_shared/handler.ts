const CORS = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "POST",
	"Access-Control-Allow-Headers": "authorization,content-type,x-forwarded-for,apikey,x-client-info",
}

const HEADERS = {
	...CORS,
	"Content-Type": "application/json",
}

export function handler(handle: (req: Request) => Promise<Response>): (req: Request) => Promise<Response> {
	return async (req: Request) => {
		try {
			if (req.method === "OPTIONS") {
				return new Response(null, {
					headers: { ...CORS },
				})
			}

			return await handle(req)
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err)
			return internalServerError()
		}
	}
}

export function created(body: unknown): Response {
	return new Response(JSON.stringify(body), {
		status: 201,
		headers: HEADERS,
	})
}

export function badRequest(message: string): Response {
	return new Response(JSON.stringify({
		message,
	}), {
		status: 400,
		headers: HEADERS,
	})
}

export function forbidden(message: string): Response {
	return new Response(JSON.stringify({
		message,
	}), {
		status: 403,
		headers: HEADERS,
	})
}

export function internalServerError(): Response {
	return new Response(JSON.stringify({
		message: "Something went horribly wrong.",
	}), {
		status: 500,
		headers: HEADERS,
	})
}