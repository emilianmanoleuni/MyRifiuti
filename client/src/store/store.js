import { mdiNumeric9PlusBoxMultiple } from '@mdi/js'
import { createStore } from 'vuex'

export default createStore({
    strict: true,
    state() {
        return {
            token: null,
            user: null,
            isUserLoggedIn: false
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            if(token){
                state.isUserLoggedIn = true
            } else {
                state.isUserLoggedIn = false
            }
        },
        setUser(state, user) {
            state.user = user
        },
        cleanAuthData(state){
            state.token = null,
            state.user = null,
            state.isUserLoggedIn = false
        }
    },
    actions: {
        setToken({ commit }, token) {
            commit('setToken', token)
        },
        setUser({ commit }, user) {
            commit('setUser', user)
        },
        logout({ commit }){
            commit('clearAuthData')
        }
    }
})
