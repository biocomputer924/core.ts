export default immutable

type immutable<A> = (
	unknown extends A ? unknown :
	A extends Date ? Date :
	A extends (this: any, a: any) => any ? A : {
		readonly [I in keyof A]: immutable<A[I]>
	}
)
