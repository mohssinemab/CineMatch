import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    userName: '',
    searchResults: [],
    isSearching: false
  },
  mutations: {
    login(state, userName) {
      state.isLoggedIn = true;
      state.userName = userName;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userName = '';
    },
    setSearchResults(state, results) {
      state.searchResults = results;
    },
    setIsSearching(state, value) {
      state.isSearching = value;
    }
  },
  actions: {
    updateSearchResults({ commit }, results) {
      commit('setSearchResults', results);
      commit('setIsSearching', results.length > 0);
    }
  }
});