module.exports = {
	entry: {
		app: './src/app.js'
	},
	output: {
		path: __dirname + '/build',
		filename: '[name].js',
		library: 'app',//设置库的名称
		libraryTarget: 'umd' //导出方式，umd方式是支持cmd、amd和全局window的访问方式
	}
}