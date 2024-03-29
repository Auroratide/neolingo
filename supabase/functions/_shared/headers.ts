export function ips(req: Request) {
	return req.headers.get("x-forwarded-for")?.split(/\s*,\s*/)
}
