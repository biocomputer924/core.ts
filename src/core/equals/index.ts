export default function self(x: unknown, y: unknown) {
	if (x === y) {
		return true
	}

	switch (typeof x) {
		case "boolean": {
			if (y instanceof Boolean) {
				return x == y
			}

			return false
		}
		case "number": {
			if (y instanceof Number) {
				return x == y
			}

			return false
		}
		case "string": {
			if (y instanceof String) {
				return x == y
			}

			return false
		}
		case "object": {
			if (x === null) {
				return false
			}

			if (x instanceof Boolean) {
				if (typeof y === "boolean") {
					return x == y
				}

				if (y instanceof Boolean) {
					return x == y
				}

				return false
			}

			if (x instanceof Number) {
				if (typeof y === "number") {
					return x == y
				}

				if (y instanceof Number) {
					return x == y
				}

				return false
			}

			if (x instanceof String) {
				if (typeof y === "string") {
					return x == y
				}

				if (y instanceof String) {
					return x == y
				}

				return false
			}

			if (typeof y !== "object") {
				return false
			}

			if (y === null) {
				return false
			}

			if (Object.keys(x).length != Object.keys(y).length) {
				return false
			}

			for (const key in x) {
				if (! (key in y)) {
					return false
				}

				if (! self((x as any)[key], (y as any)[key])) {
					return false
				}
			}

			return true
		}
		case "undefined": {
			return typeof y === "undefined"
		}
	}
}
