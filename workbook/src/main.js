// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import App from './App'
require('./assets/darkness.css')

Vue.use(VueRouter)

const routes = [
	// {path: '/', name: 'index', component: require('./components/index')},
	{path: '*', name: '404', component: require('./components/404')}
]

const router = new VueRouter({
	routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  ...App
})
