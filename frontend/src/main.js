import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex'; // import createStore from Vuex
import App from './App.vue';
import Home from './components/Home.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import MovieDesc from './components/MovieDesc.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/movie/:id', component: MovieDesc }

    
  ],
});

// Create a new Vuex store
const store = createStore({
  state: {
    isLoggedIn: false,
  },
  mutations: {
    login(state) {
      state.isLoggedIn = true;
    },
  },
});

// Use the Vuex store in your Vue app
createApp(App).use(router).use(store).mount('#app');