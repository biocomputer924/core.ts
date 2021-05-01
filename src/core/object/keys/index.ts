export default <A extends {}>(a: A) => {
	return <(keyof A)[]> Object.keys(a)
}
