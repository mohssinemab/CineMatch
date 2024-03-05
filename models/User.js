const mongoose = require("mongoose");

//Le model d'un utilisateur
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
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
    favoriteGenres: [{ type: String }]
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);