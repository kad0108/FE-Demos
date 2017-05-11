<template>
	<div class="editor" ref="editor">
		<div class="code" v-html="normalCode"></div>
		<pre v-html="highlightCode"></pre>
	</div>
</template>

<script>
import Prism from 'prismjs';

export default {
	props: {
		code: String
	},
	computed: {
		highlightCode () {
			return Prism.highlight(this.code, Prism.languages.css);
		},
		normalCode () {
			return `<style>${this.code}</style>`;
		}
	},
	methods: {
		scrollDown () {
			this.$refs.editor.scrollTop = 10000;
		}
	}
}
</script>
<style scoped>
.code{
	display: none;
}
</style>