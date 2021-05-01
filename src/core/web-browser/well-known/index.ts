import * as fs from "fs"

export default async () => {
	return <const> {
		"Google Chrome": {
			"capabilities": {
				"browserName": "chrome",
				"goog:chromeOptions": {
					"excludeSwitches": ["enable-automation"],
					"useAutomationExtension": false,
					"extensions": [
						await fs.promises.readFile(`${process.cwd()}/bin/fireshot/pack.crx`, {encoding: 'base64'})
					]
				}
			}
		},
		"Google Chrome (Mobile emulation)": {
			"capabilities": {
				"browserName": "chrome",
				"goog:chromeOptions": {
					"excludeSwitches": ["enable-automation"],
					"useAutomationExtension": false,
					"mobileEmulation": {
						"deviceName": "Nexus 5"
					},
					"extensions": [
						await fs.promises.readFile(`${process.cwd()}/bin/fireshot/pack.crx`, {encoding: 'base64'})
					]
				}
			}
		},
		"Firefox": {
			"capabilities": {
				"browserName": "firefox",
			}
		},
		"Internet Explorer": {
			"capabilities": {
				"browserName": "internet explorer",
				"se:ieOptions": {
					"nativeEvents": true
				}
			}
		}
	}
}
