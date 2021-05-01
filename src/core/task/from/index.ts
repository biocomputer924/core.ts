export default <A>(action: () => Promise<A>) => {
	const state = {
		resolve: (a: A) => {},
		reject: (e: any) => {},
		status: "ready" as "ready" | "cancelled" | "in-progress" | "done",
		action: action
	}

	return {
		start() {
			if (state.status != "ready") {
				return
			}

			state.status = "in-progress"

			return (async () => {
				try {
					var a = await state.action()

					if ((state.status as any) == "cancelled") {
						return
					}

					state.status = "done"

					state.resolve(a)
				} catch (e) {
					if (state.status == "cancelled") {
						return
					}

					state.status = "done"

					state.reject(e)
				}
			})()
		},
		cancel() {
			if (state.status != "in-progress") {
				return
			}

			state.status = "cancelled"
		},
		result: new Promise<A>(async (resolve, reject) => {
			state.resolve = resolve
			state.reject = reject
		})
	}
}
