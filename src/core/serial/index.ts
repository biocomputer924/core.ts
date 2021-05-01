export default async <
	F extends (() => Promise<unknown>)[]
>(actions: F) => {
	for (const f of actions) {
		await f()
	}
}
