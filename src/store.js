import { createStore } from "vuex";
import * as Cookies from 'js-cookie'

const store = createStore({
    state:{
        token: String,
        update: Boolean,
        showAddItem: Boolean
    },
    mutations: {
        setToken(tkn){
            this.token = tkn
        },
        toggleItem(){
            this.showAddItem = !this.showAddItem
            this.update = false
        },
        toggleUpdate(){
            this.showAddItem = true
            this.update = true
        }
    },
    plugins: [
        createPersistedState({
          getState: (key) => Cookies.getJSON(key),
          setState: (key, state) => Cookies.set(key, state, { expires: 7, secure: true })
        })
    ]  
});

export default store;