
export default async function <
	A extends Readonly<unknown[]>
>(
	this: (
		import("core/dependencies").default
	),
	f: A
): Promise<A[number]> {
	return f[await this["core/random/integer"](0, f.length - 1)]
}
