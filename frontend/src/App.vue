<template>
  <div id="app">
    <nav class="nav">
      <router-link to="/">
        <img src="./assets/cinematch_logo.png" alt="Logo" class="logo" />
      </router-link>
      <div>
        <router-link to="/register" class="nav-link">Register</router-link>
        <router-link to="/login" class="nav-link">Login</router-link>
      </div>
    </nav>
    <router-view />
    
    <!-- <v-btn color="primary">Vuetify Button</v-btn> -->

  </div>
</template>



<script>
export default {
  name: 'App',
};
</script>

<style>
body {
  margin: 0;
}
.nav {
  display: flex;
  justify-content: space-between;
  padding: 1em;
  background-color: #fecc00;
  align-items: center;
  margin-bottom: 1.7em;
}

.logo {
  height: 4em;
  cursor: pointer;
  transition: transform 0.3s ease; 
}

.logo:hover {
  transform: scale(1.1); 
}

.nav-link {
  text-decoration: none;
  color: #333;
  background-color: #cfcab3;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: #bbb;
}
</style>