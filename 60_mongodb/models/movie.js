const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    director: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: Number,
        required: true,
        trim: true,
    },
    created: {
        type: Date,
        default: Date.now
    },
});

const Movie = mongoose.model("movie", MovieSchema);
module.exports = Movie;