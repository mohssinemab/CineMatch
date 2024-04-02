import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createStore } from "vuex";
import App from "./App.vue";
import Home from "./components/Home.vue";
import Register from "./components/Register.vue";
import Login from "./components/Login.vue";
import MovieDesc from "./components/MovieDesc.vue";
import WishList from "./components/WishList.vue";
import Suggestions from "./components/Suggestions.vue";


import { createVuetify } from "vuetify";
import "vuetify/dist/vuetify.min.css";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/register", component: Register },
    { path: "/login", component: Login },
    { path: "/movie/:id", component: MovieDesc },
    { path: "/WishList", component: WishList },
    { path: "/Suggestions", component: Suggestions },


  ],
});

const store = createStore({
  state: {
    isLoggedIn: false,
    name: null,
    username: "",
    searchResults: [],
    isSearching: false,
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
      state.name = null;
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
      commit("setSearchResults", results);
      commit("setIsSearching", results.length > 0);
    },
  },
});

const vuetify = createVuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: "#1976D2",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
      },
    },
  },
});

createApp(App).use(router).use(store).use(vuetify).mount("#app");
