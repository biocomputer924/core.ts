export default A

type A = {
	type: "call"
	name: string
	input: unknown
	context?: {}
} | {
	type: "read"
	name: string
	context?: {}
}
