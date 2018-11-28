const mongoose = require('mongoose');
let roomSchema = mongoose.Schema({
    type: String,
    number: String,
    description: String,
    photos: [String],
    price: Number
});

let locationSchema = mongoose.Schema({
    address: String,
    coordinates: [Number],

});

let reviewSchema = mongoose.Schema({
    name: String,
    id: String,
    review: String,
    rating: Number
});

let hotelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    stars: {
        type: Number,
        min: 0,
        max: 5,
        "default": 0
    },
    description: String,
    photos: [String],
    currency: String,
    rooms: [roomSchema],
    location: locationSchema,
    reviews: [reviewSchema],
    services: [String]
});


module.exports = mongoose.model('Hotel', hotelSchema, 'hotel_data');