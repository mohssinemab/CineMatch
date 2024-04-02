<template>
    <v-container class="register-container">
        <h1 class="register-title">Register</h1>
        <v-form @submit.prevent="handleSubmit" class="register-form">
            <v-text-field label="Username" v-model="username" required outlined color="#000000"></v-text-field>

            <v-text-field label="Name" v-model="name" required outlined color="#000000"></v-text-field>

            <v-text-field label="Password" type="password" v-model="password" required outlined
                color="#000000"></v-text-field>

            <v-select
              v-model="favoriteGenres"
              :items="genres"
              item-text="name"
              item-value="id"
              label="Favorite Genres"
              multiple
            ></v-select>

            <v-btn type="submit" color="#fecc00" class="submit-btn">Register</v-btn>
            <transition name="fade">
                <v-alert v-if="registerSuccess" type="success" dense text outlined class="alert-message">
                    Registration successful! Redirecting...
                </v-alert>
                <v-alert v-else-if="registerFailed" type="error" dense text outlined class="alert-message">
                    Register failed!
                </v-alert>
            </transition>
        </v-form>
    </v-container>
</template>


<script>
import genresData from '../memory/genres.json'; // Import the genres data
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            name: '',
            password: '',
            registerSuccess: false,
            registerFailed: false,
            favoriteGenres: [],
            genres: genresData.genres.map(genre => genre.name), // Use the imported genres data
            genreMap: genresData.genres.reduce((map, genre) => ({ ...map, [genre.name]: genre.id }), {})
        };
    },
    methods: {
        handleSubmit(event) {
            event.preventDefault();

            // Validate form inputs
            if (!this.username || !this.name || !this.password) {
                this.registerFailed = true;
                return;
            }

            const favoriteGenreIds = this.favoriteGenres.map(name => this.genreMap[name]);

            console.log("favoriteGenres : ",favoriteGenreIds);

            fetch('http://localhost:3000/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.username,
                    name: this.name,
                    password: this.password,
                    favoriteGenres: favoriteGenreIds,
                }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    this.registerSuccess = true;

                    axios.get(`http://localhost:3000/user/getSuggestions/${this.username}`)
                        .then((response) => {
                            console.log(" Response suggestions in front : ",response.data);
                            // this.$store.commit('setSuggestions', response.data);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                    // Redirect to the home page after 2 seconds
                    setTimeout(() => {
                        this.$router.push('/');
                    }, 2000);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    this.registerFailed = true;
                });
        }
    }
};
</script>

<style scoped>
.register-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80vh;
    padding: 1em;
    box-sizing: border-box;
}

.register-title {
    font-size: 2.5em;
    color: #000000;
    font-weight: bold;
    margin-bottom: 1em;
}

.register-form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
    background: #e7e7e7;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}


.alert-message {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px; 
    margin-top: 10px ;
    font-size: 15px;
    text-align: center;
}

@media (max-width: 600px) {
    .register-form {
        padding: 1em;
    }
}
</style>