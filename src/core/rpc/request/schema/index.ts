import expects from "core/expects"

export default expects<import("core/json-schema").default>()(<const> {
	type: "array",
	items: {
		oneOf: [
			{
				type: "object",
				properties: {
					type: {
						const: "call"
					},
					name: {
						type: "string"
					},
					input: true
				}
			},
			{
				type: "object",
				properties: {
					type: {
						const: "read"
					},
					name: {
						type: "string"
					}
				}
			}
		]
	}
})
