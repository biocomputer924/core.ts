export default async function<
	A extends (
		{ readonly [k: string]: Promise<{ readonly default: any }> } |
		readonly Promise<{ readonly default: any }>[]
	)
>(
	a: A
) {
	const x = {} as any

	for (const k in a) {
		x[k] = (await a[k as keyof A] as any).default
	}

	return x as Result<A>
}

type Result<A> = {
	readonly [I in keyof A]: A[I] extends Promise<{ readonly default: infer V }> ? V : A[I]
}
