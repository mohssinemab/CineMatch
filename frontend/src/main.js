import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';
import App from './App.vue';
import Home from './components/Home.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import MovieDesc from './components/MovieDesc.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/movie/:id', component: MovieDesc }
  ],
});

const store = createStore({
  state: {
    isLoggedIn: false,
    userName: null,
    searchResults: [], // Add this line
    isSearching: false // Add this line
  },
  mutations: {
    login(state, userName) {
      state.isLoggedIn = true;
      state.userName = userName;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userName = null;
    },
    setSearchResults(state, results) { // Add this line
      state.searchResults = results;
    },
    setIsSearching(state, value) { // Add this line
      state.isSearching = value;
    }
  },
  actions: {
    updateSearchResults({ commit }, results) { // Add this line
      commit('setSearchResults', results);
      commit('setIsSearching', results.length > 0);
    }
  }
});

const vuetify = createVuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      }
    }
  }
})

createApp(App).use(router).use(store).use(vuetify).mount('#app');