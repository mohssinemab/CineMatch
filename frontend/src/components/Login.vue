<template>
    <v-container class="login-container">
        <h1 class="login-title">Login</h1>
        <v-form @submit.prevent="login" class="login-form">
            <v-text-field label="Username" v-model="username" required outlined color="#000000"></v-text-field>

            <v-text-field label="Password" type="password" v-model="password" required outlined
                color="#000000"></v-text-field>

            <v-btn type="submit" color="#fecc00" class="submit-btn">Login</v-btn>

            <transition name="fade">
                <v-alert v-if="loginSuccess" type="success" dense text outlined class="alert-message">
                    Login successful! Redirecting...
                </v-alert>
                <v-alert v-else-if="loginFailed" type="error" dense text outlined class="alert-message">
                    Login failed! Please try again.
                </v-alert>
            </transition>
        </v-form>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            loginSuccess: false,
            loginFailed: false,
        };
    },
    methods: {
        login(event) {
            event.preventDefault();

            fetch('http://localhost:3000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.username,
                    password: this.password,
                }),
            }).then(response => {
                if (response.ok) {
                    console.log('Login successful');
                    this.loginSuccess = true;

                    response.json().then(data => {
                        console.log('Data:', data);
                        localStorage.setItem('token', data.token); // Store the token
                        localStorage.setItem('userName', data.name); // Store the user's name

                        setTimeout(() => {
                            this.$store.commit('login', data.name); // Pass the user's name to the login mutation
                            this.$router.push('/');
                        }, 2000);
                    });
                } else {
                    this.loginFailed = true;
                }
            })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }
};
</script>

<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80vh;
    padding: 1em;
    box-sizing: border-box;
}

.login-form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    background: #e7e7e7;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}

.login-title {
    font-size: 2.5em;
    color: #000000;
    font-weight: bold;
    margin-bottom: 1em;
}

.submit-btn {
    margin-top: 20px;
}

.alert-message {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px; /* Adjust this value as needed */
    margin-top: 10px ;
    font-size: 15px;
    text-align: center;
}


/* Responsive styles */
@media (max-width: 600px) {
    .login-form {
        padding: 1em;
    }
}
</style>