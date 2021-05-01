export default A

type A<A, K extends keyof A> = {
	[I in keyof A]: I extends K
		? (A[I] extends null | infer B ? B : A[I])
		: A[I]
}
