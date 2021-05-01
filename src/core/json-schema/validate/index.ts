export default async function <
	A extends unknown,
	X extends import("..").default
>(
	this: import("core/dependencies").default,
	input: A,
	schema: X
) {
	const x = schema as import("..").default

	if (x === true) {
		return input as import("../to-ts").default<X>
	}

	if (x === false) {
		throw new Error()
	}

	if (typeof x["type"] !== "undefined") {
		switch (x["type"]) {
			case "array": {
				if (! Array.isArray(input)) {
					throw new Error()
				}

				break
			}
			case "null": {
				if (input !== null) {
					throw new Error()
				}

				break
			}
			case "object": {
				if (typeof input !== "object") {
					throw new Error()
				}

				if (input === null) {
					throw new Error()
				}

				break
			}
			default: {
				if (typeof input !== x["type"]) {
					throw new Error()
				}

				break
			}
		}
	}

	if (typeof x["enum"] !== "undefined") {
		const list = x["enum"]

		for (const expcepted of list) {
			if (! this["core/equals"](input, expcepted)) {
				throw new Error()
			}
		}
	}

	if (typeof x["const"] !== "undefined") {
		if (! this["core/equals"](input, x["const"])) {
			throw new Error()
		}
	}

	if (typeof x["items"] !== "undefined") {
		const items = x["items"]

		if (! Array.isArray(input)) {
			throw new Error()
		}

		if (Array.isArray(items)) {
			if (items.length != input.length) {
				throw new Error()
			}

			input.forEach((item, i) => this["core/json-schema/validate"](item, items[i]))
		} else {
		}
	}

	if (typeof x["properties"] !== undefined) {
		for (const k in x["properties"]) {
			if (x["required"] && ! x["required"].includes(k) && typeof (input as any)[k] === "undefined") {
				throw new Error()
			}

			(this["core/json-schema/validate"]((input as any)[k], x["properties"][k]))
		}
	}

	return input as import("../to-ts").default<X>
}
