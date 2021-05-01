export default X

type X<A extends import("../").default> = (
	A extends true ? (
		unknown
	) :
	A extends false ? (
		never
	) : (
		(
			A extends { readonly "type": "array", readonly "items": never }
				? readonly unknown[]
				: unknown
		) & (
			A extends { readonly "items": readonly any[] }
				? Map<A["items"]>
				: unknown
		) & (
			A extends { readonly "items": { readonly [k: string]: any } }
				? X<A["items"]>[]
				: unknown
		) & (
			A extends { readonly "type": "boolean" }
				? boolean
				: unknown
		) & (
			A extends { readonly "type": "null" }
				? null
				: unknown
		) & (
			A extends { readonly "type": "number" }
				? number
				: unknown
		) & (
			A extends { readonly "type": "object", readonly "properties": never }
				? object
				: unknown
		) & (
			A extends { readonly "properties": any }
				? Map<A["properties"]>
				: unknown
		) & (
			A extends { readonly "type": "string" }
				? string
				: unknown
		) & (
			A extends { readonly "enum": readonly Value[] }
				? A["enum"][number]
				: unknown
		) & (
			A extends { readonly "const": Value }
				? A["const"]
				: unknown
		) & (
			A extends { readonly "oneOf": readonly any[] }
				? Map<A["oneOf"]>[number]
				: unknown
		)
	)
)

type Map<A> = {
	readonly [I in keyof A]: X<A[I]>
}

type Value = (
	boolean |
	number |
	string |
	{
		readonly [k: string]: Value
	} |
	readonly Value[]
)
