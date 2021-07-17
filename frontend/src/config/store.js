import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    //user: { id: 1, name: 'Pedro Henrique da Silva', email: 'pedro.ufsj@gmail.com', admin: true }
    state: { isMenuVisible: true, user: null },
    mutations: {
        toggleMenu(state, isVisible) {
            if (!state.user) {
                state.isMenuVisible = false
                return
            }
            if (!state.user) {
                state.isMenuVisible = false
                return
            }
            if (isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        },
        setUser(state, user) {
            state.user = user
            if (user) {
                require('axios').defaults.headers.common['Authorization'] = `bearer ${user.token}`
                state.isMenuvisible = true
            } else {
                delete axios.defaults.headers.common['Authorization']
                state.isMenuvisible = false
            }
        }
    }
})