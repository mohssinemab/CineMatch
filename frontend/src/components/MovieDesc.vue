<template>
    <v-container class="movie-desc">
        <v-row>
            <v-col cols="12" md="6">
                <v-card>
                    <v-img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="Movie poster"
                        @load="loading = false" height="450px"></v-img>
                    <v-card-title class="headline">{{ movie.title }}</v-card-title>
                    <v-card-subtitle>{{ formattedReleaseDate }}</v-card-subtitle>
                    <v-card-text>
                        <p><strong>Genres:</strong></p>
                        <v-chip v-for="genre in movie.genres" :key="genre.id" small>{{ genre.name }}</v-chip>
                        <p><strong>Language:</strong> {{ movie.original_language }}</p>
                        <p><strong>Rating:</strong></p>
                        <v-rating v-model="movie.vote_average" readonly half-increments></v-rating>
                        <p><strong>Production Companies:</strong></p>
                        <ul class="production-companies">
                            <li v-for="company in movie.production_companies" :key="company.id">
                                <img :src="getCompanyLogo(company)" :alt="company.name + ' logo'" loading="lazy">
                                <small>{{ company.name }}</small>
                            </li>
                        </ul>
                        <p><strong>Production Countries:</strong> {{ formattedProductionCountries }}</p>
                    </v-card-text>
                    <v-card-text>
                        <!-- ... rest of the card text ... -->
                        <p><strong>Your Rating:</strong></p>
                        <v-rating v-model="userRating" @input="saveRating" half-increments></v-rating>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title class="headline">Overview</v-card-title>
                    <v-card-text>{{ movie.overview }}</v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
import PH_logo from '../assets/cinematch_logo.png'; // Import the placeholder logo image

export default {
    data() {
        return {
            movie: {},
            loading: true, // Add this line
            placeholderLogo: PH_logo, // Placeholder logo image
        };
    },
    computed: {
        genres() {
            return this.movie.genres ? this.movie.genres.map(genre => genre.name).join(', ') : '';
        },
        formattedReleaseDate() {
            return new Date(this.movie.release_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
        },
        formattedProductionCountries() {
            return this.movie.production_countries ? this.movie.production_countries.map(country => country.name).join(', ') : '';
        }
    },
    methods: {
        getCompanyLogo(company) {
            return company.logo_path ? 'https://image.tmdb.org/t/p/w200' + company.logo_path : this.placeholderLogo;
        },
    },
    created() {
        const id = this.$route.params.id;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_APP_API_KEY}`,
            },
        };
        axios(`https://api.themoviedb.org/3/movie/${id}`, options)
            .then(response => {
                this.movie = response.data;
                this.loading = false; // Add this line
            })
            .catch(error => {
                console.error(error);
            });
    },
};
</script>

<style scoped>
.movie-desc {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-top: 50px;
    padding: 20px;
}

.production-companies {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.production-companies li {
    display: flex;
    align-items: center;
}

.production-companies img {
    width: 50px;
    height: auto;
    margin-right: 10px;
}

.production-companies span {
    font-size: 14px;
    font-weight: bold;
}
</style>