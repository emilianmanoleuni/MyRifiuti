import { createStore } from 'vuex'

export default createStore({
    strict: true,
    state() {
        return {
            token: localStorage.getItem('token') || null,
            user: JSON.parse(localStorage.getItem('user')) || null,
            isUserLoggedIn: !!localStorage.getItem('token')
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            state.isUserLoggedIn = !!token
            if (token) {
                localStorage.setItem('token', token)
            } else {
                localStorage.removeItem('token')
            }
        },
        setUser(state, user) {
            state.user = user
            if (user) {
                localStorage.setItem('user', JSON.stringify(user))
            } else {
                localStorage.removeItem('user')
            }
        },
        clearAuthData (state){
            state.token = null
            state.user = null
            state.isUserLoggedIn = false
            localStorage.removeItem('token')
            localStorage.removeItem('user')
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
