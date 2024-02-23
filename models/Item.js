const mongoose = require("mongoose");

//Le model d'un film ou série
const itemSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    note: {
        type: Number,
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Item', itemSchema);