import user from './modules/user.js'

// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		user,
	}
})
// #endif

// #ifdef VUE3
import {
	createStore
} from 'vuex'
// todo ssr
const store = createStore({
	modules: {
		user,
	}
})
// #endif

export default store