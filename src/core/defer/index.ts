export default (action: () => Promise<unknown>) => {
	return {
		then: async <A>(
			f: (value: unknown) => Promise<A>
		) => {
			try {
				return await f(false)
			} finally {
				await action()
			}
		}
	}
}
