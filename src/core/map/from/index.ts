export default <A extends readonly (readonly [string, any])[]>(a: A) => {
	return {
		"list": a
	} as {
		"keys": Keys<A>
		"list": A
	} & Map<A>
}

type Map<A extends readonly (readonly [string, any])[]> = {
	[K in Key<A>]: Value<A, K>
}

type Keys<A extends readonly (readonly [string, any])[]> = {
	[I in keyof A]: A[I] extends readonly [infer K, infer V]
		? V
		: A[I]
}

type Key<A extends readonly (readonly [string, any])[]> = A extends readonly (readonly [infer A, any])[] ? A : never

type Value<A extends readonly (readonly [string, any])[], K extends string> = {
	[I in keyof A]: A[I] extends readonly [K, infer V] ? V : never
}[number]
