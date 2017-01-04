<template>
	<div id="raw-editor">
		<textarea 
			:value="rawHtml"
			@input="renderMarkdown"
			class="form-control">
		</textarea>
	</div>
</template>

<script>
//rawHtml内容改变，就触发renderHtml方法
export default {
	computed: {
		rawHtml () {
			return this.$store.getters.getRawHtml
		},
	},
	methods: {
		renderMarkdown (e) {
			this.$store.dispatch('renderMarkdown', e.target.value);
		}
	}
}
</script>

<style>
#raw-editor {
    float:left;
    width:45%;
    height:100%;
}
textarea{
    width: 100%;
    height:100%;
    border: 0;
    border-radius: 0;
    padding: 10px;
    font-size: 16px;
    font-family: "Microsoft YaHei";
}
</style>