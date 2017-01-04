<template>
	<div id="render-editor" v-html="renderHtml"></div>
</template>

<script>
export default {
	computed: {
		renderHtml () {
			return this.$store.getters.getRenderHtml
		}
	}
}
</script>

<style>
#render-editor {
    float:right;
    width:50%;
    height:100%;
    overflow-y: scroll;
    color: white;
}
</style>