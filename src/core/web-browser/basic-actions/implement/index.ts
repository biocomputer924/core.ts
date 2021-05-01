import { futimes } from "fs"

export default async function (
	this: (
		import("core/dependencies").default &
		{
			"selenium-webdriver": typeof import("selenium-webdriver")
		}
	),
	input: import("core/type/immutable").default<{
		capabilities: {}
	}>
) {
	var driver = null as any as import("selenium-webdriver").WebDriver

	return this["core/override"](this["core/web-browser/basic-actions"], {
		"core/web-browser/start": async function () {
			if (driver) {
				return
			}

			driver = await new this["selenium-webdriver"].Builder()
				.withCapabilities(input.capabilities)
				.build()
		},
		"core/web-browser/quit": async function () {
			if (! driver) {
				return
			}

			await driver.quit()
		},
		"core/web-browser/active-element/blur": async function (x) {
			await driver.executeAsyncScript(`
				var resolve = arguments[arguments.length - 1]

				document.activeElement.blur()

				resolve()
			`)
		},
		"core/web-browser/cursor/move-to": async function (x) {
			await this["core/web-browser/wait-for-alert-not-exists"]({})

			const rect = await x.target.getRect()

			const info = <{
				size: {
					width: number
					height: number
				}
			}> await this["core/web-browser/execute-script"](`return {
				size: {
					width: window.innerWidth,
					height: window.innerHeight
				}
			}`)

			const position = {
				x: Math.floor(rect.x - info.size.width / 2),
				y: Math.floor(rect.y - info.size.height / 2)
			}

			await driver.executeAsyncScript(`
				var resolve = arguments[arguments.length - 1]

				var get = function () {
					return {
						x: Math.floor(window.scrollX || window.pageXOffset),
						y: Math.floor(window.scrollY || window.pageYOffset)
					}
				}

				var init = get()

				var prev = null

				var done = ${JSON.stringify(position)}

				var diff = {
					x: done.x - init.x,
					y: done.y - init.y
				}

				var duration = 200

				var begin = Date.now()

				var scroll = function (self) {
					var time = Math.min(duration, Date.now() - begin)

					window.scrollTo(
						init.x + diff.x * time / duration,
						init.y + diff.y * time / duration
					)

					var curr = get()

					if (prev && curr.x == prev.x && curr.y == prev.y) {
						resolve()
					} else {
						prev = curr

						setTimeout(self, 15, self)
					}
				}

				scroll(scroll)
			`)
		},
		"core/web-browser/element/click": async function (x) {
			const tagName = await x.target.getTagName()

			switch (tagName.toLowerCase()) {
				case "option": {
					await x.target.click()

					await this["core/web-browser/active-element/blur"]({})

					break;
				}

				default: {
					await this["core/web-browser/cursor/move-to"]({
						target: x.target
					})

					await x.target.click()

					break;
				}
			}

		},
		"core/web-browser/element/get": async function (x) {
			await this["core/web-browser/wait-for-alert-not-exists"]({})

			return await driver.findElement(x.filter)
		},
		"core/web-browser/element/list": async function (x) {
			await this["core/web-browser/wait-for-alert-not-exists"]({})

			return await driver.findElements(x.filter)
		},
		"core/web-browser/element/send-keys": async function (x) {
			await this["core/web-browser/cursor/move-to"]({
				target: x.target
			})

			await x.target.clear()

			await x.target.sendKeys(x.keys)

			await this["core/web-browser/active-element/blur"]({})
		},
		"core/web-browser/execute-script": async function (x) {
			await this["core/web-browser/start"]({})

			return driver.executeScript(x)
		},
		"core/web-browser/load": async function (x) {
			await this["core/web-browser/start"]({})

			return await driver.get(x)
		},
		"core/web-browser/take-screenshot": async function (x) {
			await this["core/web-browser/start"]({})

			return await driver.takeScreenshot()
		},
		"core/web-browser/wait-for-alert-not-exists": async function (x) {
			await this["core/web-browser/start"]({})

			try {
				while (true) {
					await driver["switchTo"]().alert()
					await this["core/sleep"](15)
				}
			} catch (e) {
				if (e instanceof this["selenium-webdriver"]["error"]["NoSuchAlertError"]) {
					return
				}
			}
		},
		"core/web-browser/wait-for-page-to-load": async function (x) {
			while (true) {
				try {
					await this["core/web-browser/wait-for-alert-not-exists"]({})

					await driver.wait(this["selenium-webdriver"].until.urlMatches(x["target"]))
					await driver.executeAsyncScript(`
						var resolve = arguments[arguments.length - 1]

						if (document.readyState == "complete") {
							resolve(null)
						} else {
							window.addEventListener("load", function (event) {
								resolve(null)
							})
						}
					`)

					await this["core/task/on-screenshot"]({
						image: await this["core/web-browser/take-screenshot"]({})
					})

					return
				} catch (e) {
					if (e instanceof this["selenium-webdriver"].error.UnexpectedAlertOpenError) {
						continue
					}

					throw e
				}
			}
		},
		"core/web-browser/wait-for-number-of-windows-to-be": async function (x) {
			await this["core/web-browser/start"]({})

			while (true) {
				const xs = await driver.getAllWindowHandles()

				if (xs.length == x) {
					return xs
				}

				await this["core/sleep"](15)
			}
		},
		"core/web-browser/window/switch": async function (x) {
			await this["core/web-browser/start"]({})

			await driver.switchTo().window((await driver.getAllWindowHandles())[x])
		}
	})
}
