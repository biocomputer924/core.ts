export default F

type F<A extends "boolean" | "number" | "string" | {

}> =
	A extends "boolean" ? boolean :
	A extends "number" ? number :
	A extends "string" ? string : {
		[I in keyof A]: F<A[I]>
	}
