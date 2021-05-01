export default function <
	A,
	K extends readonly (keyof A)[],
	B extends {
		[I in K[number]]: (
			this: {
				[J in keyof A]: J extends K[number] ? NonNullable<A[J]> : A[J]
			},
			... x: Parameters<NonNullable<A[I]>>
		) => ReturnType<NonNullable<A[I]>>
	}
>(
	this: A,
	k: K,
	b: B
) {
	return b
}
