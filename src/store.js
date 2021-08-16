import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

const store = createStore({
    state:{
        token: '',
    },
    mutations: {
        setToken(){
            this.token = arguments[1]
        }
    },
    plugins: [
        createPersistedState({
          getState: (key) => Cookies.get(key),
          setState: (key, state) => Cookies.set(key, state, { expires: 7, secure: true }),
          removeState: (key) => Cookies.remove(key),
        })
    ]  
});

export default store;