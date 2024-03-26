const mongoose = require("mongoose");

// User model
const userSchema = new mongoose.Schema({
    username: { // Unique username
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    favoriteGenres: [{ type: String }], // Array of genres
    wishlist: [{ type: Number }]  // Array of movie IDs
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);