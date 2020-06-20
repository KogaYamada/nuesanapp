import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  user: {
    name:"displayName"
  }
}

const mutations = {
  setUser(state, user) {
    // さっき取得、整形したuserをstate.userにいれる
    // これで、storeにセット完了するので,Home.vueでgetters使って取れるはず
    state.user = user
  }
}

const getters = {
  user: state => state.user
}


const actions = {
  setUser({ commit }, user) {
    commit('setUser', user)
  }
}

// const modules = {}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

// ここで上で書いたinitを使って初期設定！

export default store