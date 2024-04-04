<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-select :items="sortOptionNames" v-model="selectedSortOptionName" label="Sort by" outlined></v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" md="4" lg="4" v-for="movie in sortedMovies" :key="movie.id">
                <v-card class="elevation-2 mb-4 item color-background-card">
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
            selectedSortOptionName: 'Vote Average',
            sortOptions: {
                'Vote Average': 'vote_average',
                'Popularity': 'popularity',
                'Release Date': 'release_date',
            },
        };
    },
    computed: {
        sortOptionNames() {
            return Object.keys(this.sortOptions);
        },
        sortedMovies() {
            const sortOption = this.sortOptions[this.selectedSortOptionName];
            console.log("sortOption : ", sortOption);

            return [...this.movies]
                .filter(movie => movie.poster_path !== null)
                .sort((a, b) => {
                    if (sortOption === 'release_date') {
                        return new Date(b[sortOption]) - new Date(a[sortOption]);
                    }
                    return b[sortOption] - a[sortOption];
                });
        },
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
.color-background-card {
    background-color: #f5f4f0;
}
</style>