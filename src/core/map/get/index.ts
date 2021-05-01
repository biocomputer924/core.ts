export default <
	A extends readonly Readonly<[string, any]>[],
	K extends A[number][0]
>(
	a: A,
	k: K
) => {
	const x = a.find(x => x[0] == k)

	return (x as A[number])[1] as any as Result<A, K>
}

type Result<A extends readonly any[], K> = {
	[I in keyof A]: A[I] extends Readonly<[K, unknown]> ? A[I][1] : never
}[number]
