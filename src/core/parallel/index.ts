export default async <
	F extends (() => Promise<unknown>)[]
>(actions: F) => {
	for (const x of actions.map(f => f())) {
		await x
	}
}
