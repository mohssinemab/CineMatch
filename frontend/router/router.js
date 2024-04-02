import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import Register from "@/views/Register.vue";
import Wishlist from "@/views/Wishlist.vue";
import Login from "@/views/Login.vue";
import MovieDesc from "@/views/MovieDesc.vue";
import Suggestions from "@/views/Suggestions.vue";


Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/movie/:id",
      name: "movie",
      component: MovieDesc,
      props: true,
    },
    {
      path: "/WishList",
      name: "WishList",
      component: Wishlist,
    },
    {
      path: "/Suggestions",
      name: "Suggestions",
      component: Suggestions,
    },
    
  ],
});
