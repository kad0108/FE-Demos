const fs = require('fs');
const path = require('path');

const readFile = function(fileName){
	return new Promise((resolve, reject) => {
		fs.readFile(fileName, (err, data)=>{
			if(err) reject(err);
			else resolve(data.toString());//读进来的data是buffer
		})
	})
}

/*
* path.resolve相当于不断的调用系统的cd命令
* __dirname变量获取当前模块文件所在目录的完整绝对路径
*/
console.log(__dirname);
const fileName = path.resolve(__dirname, './data.json');
const result = readFile(fileName);
result.then(data => {
	console.log(JSON.parse(data));
})