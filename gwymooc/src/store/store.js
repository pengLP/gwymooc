import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    userid: '',
    username: '',
    logstate: true,

  },
  mutations:{
    idstate(state,stark){

      state.username = stark.username;
      state.userid = stark.userid;
      state.logstate = false;
    },
    logout(state){
      state.username = '';
      state.userid = '';
      state.logstate = true;
    }
  }
})

export default store
