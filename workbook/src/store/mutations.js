import * as types from './mutation-types'

export default {
	[types.MARKDOWN_SUCCESS] (state, newHtml) {
		state.rawHtml = newHtml.rawHtml;
		state.renderHtml = newHtml.renderHtml;
	}
}