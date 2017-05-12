<template>
	<div class="markdown" ref="mdeditor" :class="{tohtml: tohtml}">
		<div v-if="tohtml" v-html="txt"></div>
		<pre v-else>{{txt}}</pre>
	</div>
</template>

<script>
import marked from 'marked';
export default {
	props: {
		md: String,
		tohtml: Boolean
	},
	computed: {
		txt () {
			return this.tohtml ? marked(this.md) : this.md;
		}
	},
	methods: {
		scrollDown () {
			this.$refs.mdeditor.scrollTop = 10000;
		}
	}
}
</script>

<style scoped>
.tohtml {
	animation: flip 2s;
}

@keyframes flip {
	from {
	  opacity: 0;
	}
	to {
	  opacity: 1;
	}
}
</style>