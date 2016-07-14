module.exports = {
	entry: {
		app: './src/app.js'
	},
	output: {
		path: __dirname + '/build',
		filename: '[name].js',
		library: 'app',
		libraryTarget: 'umd'
	}
}