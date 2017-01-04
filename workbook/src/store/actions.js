import * as types from './mutation-types'
import marked from 'marked'

export default {
	renderMarkdown ({commit}, val) {
		var renderHtml = marked(val);
		var newHtml = {
			rawHtml: val,
			renderHtml: renderHtml
		}
		commit(types.MARKDOWN_SUCCESS, newHtml)
	}
}