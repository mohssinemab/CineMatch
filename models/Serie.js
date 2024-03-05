const mongoose = require("mongoose");

//Le model d'un film ou série
const serieSchema = new mongoose.Schema({
    serieId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },  
    note: {
        type: Number,
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Serie', serieSchema,);