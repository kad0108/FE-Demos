<template>
	<div id="app">
		<editor ref="editor" :code="code"></editor>
		<mdeditor ref="markdown" :md="md" :tohtml="tohtml"></mdeditor>
	</div>
</template>

<script>
import str1 from './assets/prestyle.css';
import str2 from './assets/premd.css';
import str3 from './assets/md.css';

import Editor from './components/Editor';
import Mdeditor from './components/Mdeditor';

let kad = `
Adong Kong
----

* Email: kad0108@foxmail.com

* Tel: 18742526867

* Github: https://github.com/kad0108

* Blog: http://kadong.space/

* Education: DUT. MS.


Skills
----

1. Data Structure and Algorithm

2. Html5, CSS3, JS Front-End Development

3. VueJS, NodeJS Development

4. C++/C, Python

5. HTTP, DNS
`;

export default {
	components: {
		Editor,
		Mdeditor,
	},
	data () {
		return {
			allCode: [str1, str2, str3],
			code: '',
			md: '',
			allmd: kad,
			tohtml: false,
		}
	},
	created () {
		this.showStyle();
	},
	methods: {
		showStyle: async function () {
			await this.runStyle(0);
			await this.runMd();
			await this.runStyle(1);
			await this.showHtml();
			await this.runStyle(2);
		},
		runStyle (idx){
			return new Promise((resolve, reject) => {
				let len = this.calLen(idx);
				let tmpCode = this.allCode[idx];
				let preLen = len - tmpCode.length;
				
				let timer = setInterval(() => {
					if(this.code.length >= len) {
						clearInterval(timer);
						resolve();
					}
					let l = this.code.length - preLen;
					this.code += tmpCode.substring(l, l+1);
					if(this.code.charAt(this.code.length-1) === '\n' && this.$refs.editor){
						this.$nextTick(() => this.$refs.editor.scrollDown());
					}
				}, 50);
			})
		},
		runMd () {
			return new Promise((resolve, reject) => {
				let len = this.allmd.length;
				let cot = 0;
				let timer = setInterval(() => {
					if(cot > len) {
						clearInterval(timer);
						resolve();
					}
					this.md = this.allmd.substring(0, cot);
					if(this.md.charAt(cot-1) === '\n' && this.$refs.mdeditor){
						this.$nextTick(() => this.$refs.mdeditor.scrollDown());
					}
					cot++;
				}, 50);
			})
		},
		showHtml () {
			return new Promise((resolve, reject) => {
				this.tohtml = true;
				resolve();
			})
		},
		calLen (idx) {
			return this.allCode.filter((_, index) => index <= idx).map(item => item.length).reduce((a, b) => a+b, 0);
		},
	},
	computed: {

	}
}
</script>

<style>
*{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: "Microsoft YaHei";
}
body{
	font-size: 16px;
}
</style>