module.exports = async (env, argv) => {
	const path = require("path")

	return {
		target: "node",
		entry: "index.js",
		devtool: "inline-source-map",
		output: {
			filename  : "[name]",
			path	  : path.resolve(__dirname, "tmp/bundle"),
			publicPath: "/"
		},
		resolve: {
			extensions: [".js"],
			modules: ["node_modules"]
		},
		experiments: {
			topLevelAwait: true
		}
	}
}
