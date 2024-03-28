<template>
    <div class="login-container">
        <h1>Login</h1>
        <form @submit="login" class="login-form">
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" required>
            </div>

            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required>
            </div>

            <div>
                <button type="submit" class="submit-btn">Login</button>
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
            }).then(response => {
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
  max-width: 400px; /* Increase max-width */
  background: #e7e7e7;
  padding: 30px; /* Increase padding */
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
}

.login-form .form-group {
  margin-bottom: 1em;
}

.login-form label {
  margin-bottom: 0.5em;
}

.login-form input {
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 1.7em; 
}

.login-form {
    /* padding: 10px;
    border-radius: 4px;
    border: none;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease; */
}

.submit-btn {
    padding: 12px;
    border-radius: 4px;
    border: none;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
}


/* Responsive styles */
@media (max-width: 600px) {
  .login-form {
    padding: 1em;
  }
}
</style>