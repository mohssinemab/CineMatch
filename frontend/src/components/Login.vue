<template>
    <div>
        <h1>Login</h1>
        <form @submit="login">
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" required>
            </div>

            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required>
            </div>

            <div>
                <button type="submit">Login</button>
            </div>

            <transition name="fade">
                <p v-if="loginSuccess" class="success-message">Login successful! Redirecting...</p>
                <p v-else-if="loginFailed" class="error-message">Login failed! Please try again.</p>
            </transition>
        </form>
    </div>
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
            })
                .then(response => {
                    if (response.ok) {
                        this.loginSuccess = true;

                        setTimeout(() => {
                            this.$store.commit('login');
                            this.$router.push('/');
                        }, 2000);
                    } else {
                        this.loginFailed = true;
                    }
                    if (response.headers.get('Content-Type') === 'application/json') {
                        return response.json();
                    } else {
                        return response.text();
                    }
                })
                .then(data => {
                    console.log(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }
};
</script>

<style scoped>
form {
    background-color: #fff;
    padding: 2em;
    margin-bottom: 2em;
    border-radius: 5px;
}

form input[type="text"],
form input[type="password"],
form input[type="email"] {
    width: 100%;
    padding: 1em;
    margin-bottom: 1em;
    border-radius: 5px;
    border: 1px solid #ddd;
}

form button {
    padding: 1em 2em;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

form button:hover {
    background-color: #444;
}

.success-message {
    color: green;
    margin-top: 1em;
}

.error-message {
    color: red;
    margin-top: 1em;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>