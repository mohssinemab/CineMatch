<template>
    <div class="movie-desc">
        <div class="movie-info">
            <h1>{{ movie.title }}</h1>
            <div class="poster-container">
                <div class="image-container">
                    <img v-if="loading" src="../assets/spinner.gif" alt="Loading...">
                    <img v-else :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="Movie poster" @load="loading = false">
                </div>
            </div>
            <div class="details">
                <p><strong>Genres:</strong> {{ genres }}</p>
                <p><strong>Language:</strong> {{ movie.original_language }}</p>
                <p><strong>Release Date:</strong> {{ formattedReleaseDate }}</p>
                <p><strong>Production Companies:</strong></p>
                <ul class="production-companies">
                    <li v-for="company in movie.production_companies" :key="company.id">
                        <img :src="getCompanyLogo(company)" :alt="company.name + ' logo'" loading="lazy">
                        <span>{{ company.name }}</span>
                    </li>
                </ul>
                <p><strong>Production Countries:</strong> {{ formattedProductionCountries }}</p>
            </div>
        </div>
        <div class="overview">
            <h2>Overview</h2>
            <p>{{ movie.overview }}</p>
        </div>
    </div>
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

.movie-info {
    flex: 1;
    max-width: 600px;
    margin-right: 20px;
}

.image-container {
    width: 500px; /* Adjust as needed */
    height: 750px; /* Adjust as needed */
    position: relative;
}

.image-container img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    height: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

/* .image-container img:hover {
    transform: scale(1.015);
} */

.details p {
    margin: 8px 0;
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

.overview {
    flex: 1;
    max-width: 600px;
}

.overview h2 {
    margin-bottom: 16px;
    color: #ff5733;
    /* Highlight color */
}

.overview p {
    line-height: 1.6;
    color: #777;
    /* Text color */
}
</style>