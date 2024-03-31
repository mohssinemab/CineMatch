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
                        <p><strong>Rating:</strong> {{ movie.vote_average }}</p>
                        <p><strong>Production Companies:</strong></p>
                        <ul class="production-companies">
                            <li v-for="company in movie.production_companies" :key="company.id">
                                <img :src="getCompanyLogo(company)" :alt="company.name + ' logo'" loading="lazy">
                                <small>{{ company.name }}</small>
                            </li>
                        </ul>
                        <p><strong>Production Countries:</strong> {{ formattedProductionCountries }}</p>
                    </v-card-text>
                    <v-card-text v-if="isLoggedIn">
                        <p><strong>Your Rating:</strong></p>
                        <div class="rating-input">
                            <input type="number" v-model.number="userRating" min="0" max="10" step="0.5">
                            <button class="custom-button" @click="saveRating">Submit</button>
                        </div>
                    </v-card-text>
                    <v-card-text v-else>
                        <p>You must be logged in to rate this movie.</p>
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
            loading: true,
            placeholderLogo: PH_logo,
            userRating: 0,
            isLoggedIn: false,
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
        async checkIfLoggedIn() {
            const token = localStorage.getItem('token');
            if (!token) {
                this.isLoggedIn = false;
                return;
            }

            try {
                const response = await axios.get('http://localhost:3000/user/verify-token', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                // console.log("Token-verify  : ", response.status);
                this.isLoggedIn = response.status === 200;
            } catch (error) {
                this.isLoggedIn = false;
            }
        },
        saveRating() {
            if (!this.isLoggedIn) {
                console.error('User is not logged in');
                return;
            }

            const token = localStorage.getItem('token'); // Get the token from local storage
            if (!token) {
                console.error('No token found');
                return;
            }

            console.log('Saving rating:', this.userRating);
        },
    },
    async created() {
        await this.checkIfLoggedIn();
        const id = this.$route.params.id;

        axios.get(`http://localhost:3000/movie/details/${id}`)
            .then(response => {
                this.movie = response.data;
                this.loading = false;
                // console.log(response.data)
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

input[type="number"] {
    height: 20px;
    padding: 0 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 12px;
    margin-right: 5px;
}

.custom-button {
    height: 20px;
    padding: 0 10px;
    background-color: #1976d2;
    /* Primary color */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
}
</style>