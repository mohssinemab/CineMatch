<template>
  <div>
    <TrendingMovies v-if="isLoggedIn" />
    <div v-else>
      <h1>Please log in to see trending movies.</h1>
    </div>
  </div>

</template>

<script>
import TrendingMovies from './TrendingMovies.vue';

export default {
  name: 'Home',
  components: {
    TrendingMovies,
  },
  computed: {
    isLoggedIn() {
      // console.log("isLoggedIn : "+this.$store.state.isLoggedIn);
      // return this.$store.state.isLoggedIn;
      return true;

    },
  },
};
</script>

<style scoped>

</style>