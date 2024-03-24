<template>
  <div>
    <div class="swiper-container">
      <swiper :options="swiperOptions">
        <!-- Your slides go here -->
        <swiper-slide v-for="item in slideshowItems" :key="item.id">
          <img :src="'https://image.tmdb.org/t/p/w500' + item.poster_path" alt="Item poster">
          <!-- <h2>{{ item.title }}</h2> -->
        </swiper-slide>
      </swiper>

      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
    <div class="container">
      <div class="item" v-for="item in otherItems" :key="item.id">
        <img :src="'https://image.tmdb.org/t/p/w500' + item.poster_path" alt="Item poster">
        <h2>{{ item.title }}</h2>
      </div>
    </div>
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
        spaceBetween: 0,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: { // Add this navigation option
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    };
  },
  async created() {
    const response = await axios.get('http://localhost:3000/trend/getTrending');
    this.items = response.data;
    this.slideshowItems = this.items.slice(0, 9);
    this.otherItems = this.items.slice(9);
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  /* width: 100%; */
  margin-top: 50px;
}

.swiper-container {
  /* margin-left: 20px; */
  margin: 20px;

}

.swiper-slide {
  width: calc(100% / 3 - 40px) !important; /* Adjust this value as needed */
  margin: 10px;
}

.item {
  width: calc(100% / 4 - 10px); /* Adjust this value as needed */
  margin: 0.5em;
}

.item img {
  width: 75%; /* Adjust this value as needed */
  height: auto;
  display: block;
  margin: 0 auto;
}

.item h2 {
  text-align: center;
  font-size: 1.2em;
}
</style>