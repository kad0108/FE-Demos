import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const state = {
	totalTime: 24,
	list: [{
			name : 'Aurora',
			avatar : 'static/aurora.jpg',
			date : '2017-01-07',
			totalTime : 24,
			comment : 'New Year'
        }]
};

export default new Vuex.Store({
	state,
	mutations,
	actions
})