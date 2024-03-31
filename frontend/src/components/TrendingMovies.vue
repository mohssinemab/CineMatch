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
              <v-icon v-if="$store.state.isLoggedIn" @click.stop="addToWishlist(item)" class="mr-4"
                :class="{ 'red--text': wishlist.includes(item) }">
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
      wishlist: [], // New data property for the wishlist

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
    async addToWishlist(movie) {
      const index = this.wishlist.findIndex(item => item.id === movie.id);
      console.log('Index:', index);
      if (index === -1) {
        // Movie is not in wishlist, so add it
        try {
          console.log("username : ", this.$store.state.username, "movieId : ", movie.id);

          const response = await axios.post('http://localhost:3000/user/addToWishlist', {
            username: this.$store.state.username, // Replace this with the actual username
            movieId: movie.id,
          });

          if (response.status === 200) {
            console.log('Movie added to wishlist');
            // The movie was successfully added to the wishlist
            // You can add the movie to the local wishlist here if you want
            this.wishlist.push(movie);
          } else {
            // Handle the error
            console.error('Failed to add the movie to the wishlist');
          }
        } catch (error) {
          // Handle the error
          console.error('Failed to add the movie to the wishlist', error);
        }
      } else {
        console.log('Movie already in wishlist');
        // Movie is already in wishlist, so remove it
        this.wishlist.splice(index, 1);
        // Send a request to the backend to remove the movie from the wishlist
        try {
          const response = await axios.post('http://localhost:3000/user/removeFromWishlist', {
            username: this.$store.state.username, // Replace this with the actual username
            movieId: movie.id,
          });

          if (response.status === 200) {
            console.log('Movie removed from wishlist');
          } else {
            // Handle the error
            console.error('Failed to remove the movie from wishlist');
          }
        } catch (error) {
          console.error('Failed to remove movie from wishlist:', error);
        }
      }
    },
    // async getWishlist() {
    //   try {
    //     const response = await axios.post('http://localhost:3000/user/getWishlist', {
    //       username: this.$store.state.username, // Replace this with the actual username
    //     });

    //     if (response.status === 200 && Array.isArray(response.data)) {
    //       this.wishlist = response.data;
    //     } else {
    //       // Handle the error
    //       console.error('Failed to fetch the wishlist');
    //     }
    //   } catch (error) {
    //     // Handle the error
    //     console.error('Failed to fetch the wishlist', error);
    //   }
    // },
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
  created() {
    this.getAllMovies();
    // if (this.$store.state.isLoggedIn) {
    //   this.getWishlist();
    // }
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