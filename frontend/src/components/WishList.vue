<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="4" v-for="movie in movies" :key="movie.id">
        <v-card class="elevation-2 mb-4 item">
          <v-card-actions class="pa-0">
            <v-spacer></v-spacer>
            <v-icon v-if="this.$store.state.isLoggedIn" @click.stop="removeFromWishlist(movie)" class="mr-4"
              color="red">
              mdi-heart
            </v-icon>
          </v-card-actions>
          <router-link :to="`/movie/${movie.id}`">
            <div class="image-container">
              <v-img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" aspect-ratio="0.85"></v-img>
            </div>
          </router-link>
          <v-card-title class="text-center font-weight-bold pa-4">{{ movie.title }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      wishlist: [],
      movies: [],
    };
  },
  methods: {
    async removeFromWishlist(movie) {
      // Remove the movie from the wishlist
      const index = this.wishlist.indexOf(movie.id);
      if (index !== -1) {
        this.wishlist.splice(index, 1);

        await axios.post('http://localhost:3000/user/removeFromWishlist', {
          username: this.$store.state.username, // Replace this with the actual username
          movieId: movie.id,
        });

        // Update the movies
        this.movies = this.movies.filter(m => this.wishlist.includes(m.id));
      }
    },
  },
  async created() {
    try {
      console.log("username", this.$store.state.username);
      const response = await axios.post('http://localhost:3000/user/getWishlist', {
        username: this.$store.state.username, // Replace this with the actual username
      });

      if (response.status === 200) {
        console.log("response", response.data.wishlist);
        this.wishlist = response.data.wishlist;

        const movieDetailsPromises = this.wishlist.map(id =>
          axios.get(`http://localhost:3000/movie/details/${id}`)
        );

        const movieDetailsResponses = await Promise.all(movieDetailsPromises);

        this.movies = movieDetailsResponses.map(response => response.data);
        console.log("movies", this.movies);

      } else {
        console.error('Failed to fetch the wishlist');
      }
    } catch (error) {
      console.error('Failed to fetch the wishlist', error);
    }
  },
};
</script>