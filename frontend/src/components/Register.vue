<template>
    <div class="register-container">
        <h1>Register</h1>
        <form @submit="handleSubmit" class="register-form">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" required>
            </div>
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="name" required>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <button type="submit" class="submit-btn">Register</button>
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
.register-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    /* background-color: #e7e7e7; */
    box-sizing: border-box;
}

.register-form {
    width: 100%;
    max-width: 500px;
    background: #e7e7e7;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
}

.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}

.form-group label {
    margin-bottom: 5px;
    color: #333;
}

.form-group input {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
}

.submit-btn {
    padding: 10px;
    border-radius: 4px;
    border: none;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.submit-btn:hover {
    background-color: #45a049;
}
</style>