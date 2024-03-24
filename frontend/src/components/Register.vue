<template>
    <div>
        <h1>Register</h1>
        <form @submit="handleSubmit">
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" required>
            </div>
            <!-- <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required>
            </div> -->
            <div>
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="name" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <button type="submit">Register</button>
        </form>
    </div>
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
</style>