export default <E>(
) => <
	A extends import("../type/immutable").default<E>
>(
	a: A
) =>
	a
