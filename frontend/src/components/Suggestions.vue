<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="6" md="4" lg="4" v-for="movie in movies" :key="movie.id">
                <v-card class="elevation-2 mb-4 item">
                    <router-link :to="`/movie/${movie.id}`">
                        <div class="image-container">
                            <v-img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
                                aspect-ratio="0.85"></v-img>
                        </div>
                    </router-link>
                    <v-card-title class="text-center font-weight-bold pa-4">{{ movie.title }}</v-card-title>
                    <v-card-text class="text-center">
                        {{ movie.genre_ids.map(getGenreName).join(', ') }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
import genresData from '../memory/genres.json';

export default {
    data() {
        return {
            movies: [],
            genres: genresData.genres,
        };
    },
    methods: {
        getGenreName(genreId) {
            const genre = this.genres.find(genre => genre.id === genreId);
            return genre ? genre.name : '';
        },
    },
    created() {
        axios.get(`http://localhost:3000/user/getSuggestions/${this.$store.state.username}`)
            .then((response) => {
                console.log(" Response suggestions in front : ", response.data);
                this.movies = response.data.movies;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    },
};
</script>

<style scoped>
.movie-card {
    /* Add your CSS here */
}
</style>