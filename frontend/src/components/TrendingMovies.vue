<template>
  <div>
    <div class="swiper-container">
      <swiper :options="swiperOptions">
        <!-- Your slides go here -->
        <swiper-slide v-for="item in slideshowItems" :key="item.id">
          <router-link :to="`/movie/${item.id}`"> 
            <img :src="'https://image.tmdb.org/t/p/w500' + item.poster_path" alt="Item poster">
          </router-link> 
        </swiper-slide>
      </swiper>

      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
    <div class="container">
      <div class="item" v-for="item in otherItems" :key="item.id">
        <router-link :to="`/movie/${item.id}`"> 
        <img :src="'https://image.tmdb.org/t/p/w500' + item.poster_path" alt="Item poster">
        </router-link> 
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
        navigation: { 
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
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 50px;
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
  cursor: pointer; /* Change cursor to pointer when hovering over the slide */
}

.swiper-slide:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  transform: scale(0.98); /* Scale the slide down to 98% when hovered */
}

.item {
  width: calc(100% / 4 - 10px);
  margin: 1em;
  padding-top: 1.5em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  cursor: pointer; /* Change cursor to pointer when hovering over the card */
}

.item:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  transform: scale(1.02); /* Scale the card up to 102% when hovered */
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

.swiper-button-next, .swiper-button-prev {
  position: absolute;
  top: 50%;
  width: 27px;
  height: 44px;
  margin-top: -22px;
  z-index: 10;
  cursor: pointer;
  background-size: 27px 44px;
  background-position: center;
  background-repeat: no-repeat;
}

.swiper-button-next {
  right: 10px;
  background-image: url('path_to_next_arrow_image');
}

.swiper-button-prev {
  left: 10px;
  background-image: url('path_to_prev_arrow_image');
}
</style>