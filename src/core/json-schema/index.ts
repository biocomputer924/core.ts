export default Schema

type Schema = (
	true |
	false |
	(
		{
			readonly "type"?: "array" | "boolean" | "null" | "number" | "object" | "string"
			readonly "title"?: string
			readonly "enum"?: readonly unknown[]
			readonly "const"?: unknown
			readonly "allOf"?: readonly Schema[]
			readonly "anyOf"?: readonly Schema[]
			readonly "oneOf"?: readonly Schema[]
			readonly "not"?: Schema
		} &
		import("./type").default
	)
)
