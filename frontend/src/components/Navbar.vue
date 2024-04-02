<template>
    <nav class="nav">
        <router-link to="/" @click.native="resetSearch">
            <img src="../assets/cinematch_logo.png" alt="Logo" class="logo" />
        </router-link>

        <div class="search-bar" v-if="$route.path === '/'">
            <input type="text" v-model="searchQuery" placeholder="Search movies..." />
            <button @click="searchMovies">Search</button>
        </div>

        <div v-if="isLoggedIn">
            <span>Welcome, {{ name }}</span>
            <router-link to="/wishlist" class="nav-link ">Watchlist</router-link>
            <router-link to="/suggestions" class="nav-link">Suggestions</router-link>

            <button @click="logout" class="nav-link">Logout</button>
        </div>
        <div v-else>
            <router-link to="/register" class="nav-link">Register</router-link>
            <router-link to="/login" class="nav-link">Login</router-link>
        </div>
    </nav>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
    data() {
        return {
            searchQuery: '',
        };
    },
    computed: {
        ...mapState(['isLoggedIn', 'name'])
    },
    methods: {
        logout() {
            this.$store.commit('logout');
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            localStorage.removeItem('username');
            this.$store.commit('setLoggedIn', false); // Update the loggedIn state

            this.$router.push('/');
        },
        searchMovies() {
            const apiKey = import.meta.env.VITE_APP_API_KEY;

            console.log('Search bar:', this.searchQuery);
            console.log('apiKey:', apiKey);

            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.searchQuery}`)
                .then(response => {
                    console.log(response.data.results);
                    this.$store.dispatch('updateSearchResults', response.data.results);
                    this.searchQuery = '';

                })
                .catch(error => {
                    console.error(error);
                    this.searchQuery = '';
                });
        },

        getSuggestions() {
            axios.get(`http://localhost:3000/user/getSuggestions/${this.username}`)
                .then((response) => {
                    this.movies = response.data.movies;
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        },
        resetSearch() {
            this.$store.dispatch('updateSearchResults', []);
            this.searchQuery = ''; // Add this line
        }
    },
};
</script>

<style scoped>
.nav {
    display: flex;
    justify-content: space-between;
    padding: 1em;
    background-color: #fecc00;
    align-items: center;
    margin-bottom: 1.7em;
}



.logo {
    height: 4em;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.logo:hover {
    transform: scale(1.1);
}

.nav-link {
    text-decoration: none;
    color: #fff;
    background-color: #333;
    padding: 10px 20px;
    margin: 0 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    font-weight: bold;

}

.nav-link:hover {
    background-color: #bbb;
}



input[type="text"] {
    flex-grow: 1;
    padding: 0.4em;
    border: none;
    border-radius: 5px;
    margin-right: 0.6em;
    background-color: #fff;
}

button {
    padding: 0.2em 0.7em;
    border: none;
    background-color: #333;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
}

button:hover {
    background-color: #555;
}
</style>