<template>
  <div>
    <SearchResults v-if="isSearching" :results="searchResults" />
    <TrendingMovies v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TrendingMovies from './TrendingMovies.vue';
import SearchResults from './SearchResults.vue';

export default {
  name: 'Home',
  components: {
    TrendingMovies,
    SearchResults
  },
  computed: mapState(['searchResults', 'isSearching'])
};
</script>

<style scoped>

</style>