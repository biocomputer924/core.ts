export default (
	a: import("core/type/immutable").default<Date>
) => {
	const b = new Date(a.toISOString())
	b.setUTCHours(b.getUTCHours() + 9)

	const eraList = <const> [
		{name: "平成", "first-year": 1989},
		{name: "昭和", "first-year": 1926},
		{name: "大正", "first-year": 1912}
	]

	for (const era of eraList) if (b.getUTCFullYear() >= era["first-year"]) {
		return {
			era: era,
			year: (b.getUTCFullYear() - era["first-year"]) + 1,
			month: b.getUTCMonth() + 1,
			date: b.getUTCDate()
		}
	}

	throw new TypeError()
}
