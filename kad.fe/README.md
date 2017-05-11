# kad.fe  [demo](https://kad0108.github.io/Html5/kad.fe/dist)

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### Tips

* 实现思路
	```
	// template
	<div>{{code}}</div>
	<div v-html="styleCode"></div>

	// script
	data () {
		return {
			code: ``,
			finalCode: str,
		}
	},
	created () {
		var n = 0;
		setInterval(()=>{
			this.code = this.finalCode.substring(0, n);
			n++;
		}, 50);
	},
	computed: {
		styleCode () {
			return `<style>${this.code}</style>`;
		}
	}
	```

* html中保留回车和空格解决办法：
	```
	1. <pre></pre>
	2. white-space: pre;
	```

* [vw,vh相对于视窗的宽度(100vw)、高度(100vh)](http://www.zhangxinxu.com/wordpress/2012/09/new-viewport-relative-units-vw-vh-vm-vmin/)


* 函数传参时不用的参数可以随便起个名字占位，一般使用下划线占位符：
	```
	var arr = ['abc', 'ab', 'a'];
	arr.filter((_, index) => index<1); // ["abc"]
	```
