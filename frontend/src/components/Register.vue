<template>
    <v-container class="register-container">
        <h1 class="register-title">Register</h1>
        <v-form @submit.prevent="handleSubmit" class="register-form">
            <v-text-field
                label="Username"
                v-model="username"
                required
                outlined
                color="#000000"
            ></v-text-field>

            <v-text-field
                label="Name"
                v-model="name"
                required
                outlined
                color="#000000"
            ></v-text-field>

            <v-text-field
                label="Password"
                type="password"
                v-model="password"
                required
                outlined
                color="#000000"
            ></v-text-field>

            <v-btn type="submit" color="#fecc00" class="submit-btn">Register</v-btn>
        </v-form>
    </v-container>
</template>


<script>
export default {
    data() {
        return {
            username: '',
            email: '',
            password: ''
        };
    },
    methods: {
        handleSubmit(event) {
            event.preventDefault();
            
            fetch('http://localhost:3000/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.username,
                    name: this.name,
                    password: this.password,
                }),
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch((error) => {
                console.error('Error:', error);
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
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
}

.submit-btn {
    margin-top: 20px;
}

/* Responsive styles */
@media (max-width: 600px) {
  .register-form {
    padding: 1em;
  }
}
</style>