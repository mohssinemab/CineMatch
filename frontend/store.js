import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    name: '',
    username: '', 
    searchResults: [],
    isSearching: false
  },
  mutations: {
    login(state, name) {
      state.isLoggedIn = true;
      state.name = name;
    },
    setUsername(state, username) { 
      state.username = username;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.name = '';
    },
    setSearchResults(state, results) {
      state.searchResults = results;
    },
    setIsSearching(state, value) {
      state.isSearching = value;
    },
    setLoggedIn(state, status) {
      state.isLoggedIn = status;
    },
  },
  actions: {
    updateSearchResults({ commit }, results) {
      commit('setSearchResults', results);
      commit('setIsSearching', results.length > 0);
    }
  }
});