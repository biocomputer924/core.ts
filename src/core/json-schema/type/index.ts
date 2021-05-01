export default A

type A = (
	import("./array").default &
	import("./number").default &
	import("./object").default &
	import("./string").default
)
