export default async function (
	this: (
		import("core/dependencies").default
	),
	rawInput: unknown
): Promise<unknown> {
	const input = await this["core/json-schema/validate"](rawInput, this["core/rpc/request/schema"])

	await this["core/rpc/request/validate"](input)

	const result = []

	for (const x of input) {
		try {
			if (! (x.name in this)) {
				throw `Invalid request name: ${x.name}`
			}

			const resource = (this as any)[x.name]

			switch (x.type) {
				case "call": {
					result.push(await resource.call(this, x.input))
				}
				case "read": {
					result.push(resource)
				}
			}
		} catch (e) {
			console.log(e)

			result.push(null)
		}
	}

	return result
}
