<template>
  <div>
    <v-carousel v-if="isDataLoaded" cycle height="650">
      <v-carousel-item v-for="item in slideshowItems" :key="item.id">
        <router-link :to="`/movie/${item.id}`">
          <v-img :src="'https://image.tmdb.org/t/p/w500' + item.poster_path" aspect-ratio="1.5" class="hover-effect">
            <v-container class="fill-height">
              <!-- <v-row align="center" justify="center">
                <v-carousel-delimiters :length="slideshowItems.length" />
              </v-row> -->
            </v-container>
          </v-img>
        </router-link>
      </v-carousel-item>
    </v-carousel>

    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="4" v-for="item in otherItems" :key="item.id">
          <router-link :to="`/movie/${item.id}`"> <!-- Use template literals to construct the route -->
            <v-card class="elevation-2 mb-4 item" @click="logId(item.id)">
              <v-img :src="'https://image.tmdb.org/t/p/w500' + item.poster_path" aspect-ratio="1.5">
              </v-img>
              <v-card-title class="text-center font-weight-bold pa-4">{{ item.title }}</v-card-title>
            </v-card>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';

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
      isDataLoaded: false, // new data property
    };
  },
  methods: {
    getAllMovies() {
      axios.get('http://localhost:3000/trend/getTrending')
        .then(response => {
          this.items = response.data;
          this.slideshowItems = this.items.slice(0, 10);
          this.otherItems = this.items.slice(5);
          this.isDataLoaded = true; // set isDataLoaded to true after data is loaded
        });
    },
    logId(id) {
      console.log(id);
    },
  },
  created() {
    this.getAllMovies();
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
  /* Change cursor to pointer when hovering over the slide */
}

.swiper-slide:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  transform: scale(0.98);
  /* Scale the slide down to 98% when hovered */
}

.item {
  transition: transform 0.3s ease-in-out;
  /* Add a transition to the transform property */
  cursor: pointer;
  /* Change the cursor to a pointer when hovering over the card */
}

.item:hover {
  transform: scale(1.02);
  /* Scale the card up to 105% when hovered */
}

.item img {
  width: 75%;
  height: auto;
  display: block;
  margin: 0 auto;
}

.item h2 {
  text-align: center;
  font-size: 1.2em;
}

.v-card {
  background-color: #f8f9fa;
  /* Light gray background */
  border-radius: 0.25rem;
  /* Rounded corners */
}

.v-card-title {
  color: #343a40;
  /* Dark gray text */
}

.hover-effect {
  transition: transform 0.3s;
}

.hover-effect:hover {
  transform: scale(1.05);
}

.v-carousel__controls__item {
  border-radius: 50%;
  /* background-color: #dd2020; Change the color to make the images visible */
  opacity: 0.8;
  width: 50px;
  /* Adjust the size of the buttons */
  height: 50px;
  background-size: contain;
  /* Make the images fit within the buttons */
}

.v-carousel__controls__item--prev {

  background-image: url('./assets/prev_arrow.png');
  background-repeat: no-repeat;
  /* Do not repeat the images */
  background-position: center;
  /* Center the images */
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
</style>