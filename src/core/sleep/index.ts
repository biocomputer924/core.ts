export default (x: number) =>
	new Promise(f => setTimeout(f, x))
