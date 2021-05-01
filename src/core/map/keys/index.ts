export default <
	A extends Readonly<Readonly<[string, any]>[]>
>(
	a: A
) => {
	return a.map(x => x[0]) as any as Result<A>
}

type Result<A> = {
	[I in keyof A]: A[I] extends Readonly<[unknown, unknown]> ? A[I][0] : never
}
