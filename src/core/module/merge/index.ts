export default async <A extends readonly Promise<{default: any}>[]>(... a: A) => {
	const x = {}

	for (const v of a) {
		Object.assign(x, (await v).default)
	}

	return x as UnionToIntersection<{
		[I in keyof A]: A[I] extends Promise<{default: infer B}> ? B : never
	}[number]>
}

type UnionToIntersection<U> =
	(U extends any ? (k: U)=> void : never) extends ((k: infer I)=> void) ? I : never
