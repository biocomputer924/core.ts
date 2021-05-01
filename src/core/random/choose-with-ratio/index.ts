interface WithRatio<A> {
	readonly value: A
	readonly ratio: number
}

export default async function <A>(
	this: (
		import("core/dependencies").default
	),
	f: Readonly<WithRatio<A>[]>
) {
	let i = await this["core/random/integer"](1, f.reduce((n, x) => n + x.ratio, 0))

	for (const x of f)
	if (i <= x.ratio)
		return x.value
	else
		i -= x.ratio

	throw new Error()
}
