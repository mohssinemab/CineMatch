<template>
  <div>
    <v-carousel v-if="isDataLoaded" cycle height="650">
      <v-carousel-item v-for="item in slideshowItems" :key="item.id">
        <router-link :to="`/movie/${item.id}`">
          <v-img :src="'https://image.tmdb.org/t/p/w500' + item.poster_path" aspect-ratio="1.5" class="hover-effect">
            <v-container class="fill-height">
            </v-container>
          </v-img>
        </router-link>
      </v-carousel-item>
    </v-carousel>

    <v-container>
      <v-select :items="genreNames" v-model="selectedGenreName" label="Select a genre" outlined></v-select>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="4" v-for="item in filteredOtherItems" :key="item.id">
          <v-card class="elevation-2 mb-4 item">
            <v-card-actions class="pa-0">
              <v-spacer></v-spacer>
              <v-icon v-if="this.$store.state.isLoggedIn" @click.stop="toggleWishlist(item)" class="mr-4"
                :color="wishlist.includes(item.id) ? 'red' : 'default'">
                mdi-heart
              </v-icon>
            </v-card-actions>
            <router-link :to="`/movie/${item.id}`">
              <div class="image-container">
                <v-img :src="'https://image.tmdb.org/t/p/w500' + item.poster_path" aspect-ratio="0.85"></v-img>
              </div>
            </router-link>
            <v-card-title class="text-center font-weight-bold pa-4">{{ item.title }}</v-card-title>
            <v-card-text class="text-center">{{ item.genres.join(', ') }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';
import genresData from '../memory/genres.json';
import '@mdi/font/css/materialdesignicons.css'

export default {
  name: 'TrendingMovies',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      items: [],
      slideshowItems: [],
      otherItems: [],
      swiperOptions: {
        loop: false,
        slidesPerView: 'auto',
        centeredSlides: true,
      },
      isDataLoaded: false,
      selectedGenre: { id: 'All', name: 'All' },
      genres: genresData.genres,
      genreMap: {},
      isLoading: true,
      selectedGenreName: null,
      wishlist: [],

    };
  },
  computed: {
    genreNames() {
      return ['All', ...this.genres.map(genre => genre.name)];
    },
    filteredOtherItems() {
      if (!this.selectedGenreName || this.selectedGenreName === 'All') {
        return this.otherItems;
      }
      return this.otherItems.filter(item => item.genres.includes(this.selectedGenreName));
    },
  },
  methods: {
    async toggleWishlist(movie) {
      if (this.wishlist.includes(movie.id)) {
        // Remove the movie from the wishlist
        const index = this.wishlist.indexOf(movie.id);
        this.wishlist.splice(index, 1);

        await axios.post('http://localhost:3000/user/removeFromWishlist', {
          username: this.$store.state.username, // Replace this with the actual username
          movieId: movie.id,
        });
      } else {
        // Add the movie to the wishlist
        this.wishlist.push(movie.id);

        await axios.post('http://localhost:3000/user/addToWishlist', {
          username: this.$store.state.username, // Replace this with the actual username
          movieId: movie.id,
        });
      }
    },
    getAllMovies() {
      axios.get('http://localhost:3000/trend/getTrending')
        .then(response => {
          this.items = response.data;
          this.slideshowItems = this.items.slice(0, 10);
          this.otherItems = this.items.slice(5);
          this.isDataLoaded = true;
          this.isLoading = false;
        })
        .catch(error => {
          console.error('Error fetching movies:', error);
        });
    },
    logId(id) {
      console.log(id);
    },
  },
  async created() {
    this.getAllMovies();
    if (this.$store.state.isLoggedIn) {
      // Fetch the wishlist 
      const response = await axios.post('http://localhost:3000/user/getWishlist', {
        username: this.$store.state.username,
      });

      console.log("username : ", this.$store.state.username, " - response : ", response);
      console.log("response.data.wishlist : ", response.data.wishlist);

      // Update the wishlist
      this.wishlist = response.data.wishlist;
    }
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 50px;
}

.v-container {
  margin-top: 20px;
}

.swiper-container {
  margin: 20px;
  margin-bottom: 40px;
}

.swiper-slide {
  width: 500px !important;
  margin-right: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  cursor: pointer;
}

.image-container {
  display: inline;
}

.swiper-slide:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  transform: scale(0.98);
}

.item {
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}

.item:hover {
  transform: scale(1.02);
}

.item img {
  width: 85%;
  height: auto;
  display: block;
  margin: 0 auto;
  padding-top: 10px;
}

.item h2 {
  text-align: center;
  font-size: 1.2em;
}

.v-card {
  background-color: #f8f9fa;
  border-radius: 0.25em;
}

.v-card-title {
  color: #343a40;
}

.hover-effect {
  transition: transform 0.3s;
}

.hover-effect:hover {
  transform: scale(1.05);
}

.v-carousel__controls__item {
  border-radius: 50%;
  opacity: 0.8;
  width: 50px;
  height: 50px;
  background-size: contain;
}

.v-carousel__controls__item--prev {
  background-image: url('./assets/prev_arrow.png');
  background-repeat: no-repeat;
  background-position: center;
}

.v-carousel__controls__item--next {
  background-image: url('./assets/next_arrow.png');
  background-repeat: no-repeat;
  background-position: center;
}

.v-carousel__delimiter {
  background-color: #cc1515;
  opacity: 0.8;
}

.v-icon {
  color: #757575;
}

.v-icon.red--text {
  color: red;
}
</style>