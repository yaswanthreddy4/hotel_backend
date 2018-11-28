const mongoose = require('mongoose');

let bookHotelSchema = mongoose.Schema({
    name: String,
    hotelId: String,
    price: Number,
    bookingDate: Date,
    checkIn: Date,
    checkOut: Date
});

let userSchema = mongoose.Schema({
    // name: {
    //     type: String,
    //     // required: true
    // },
    role: {
        type: String,
        "default": "user"
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    adress: String,
    adress2: String,
    city: String,
    zip: Number,
    // phoneNumber: {
    //     type: Number,
    //     // required: true,
    //     min: 10
    // },
    // gender: String,
    lastLogin: Date,
    bookHistory: [bookHotelSchema]
});


mongoose.model('User', userSchema, 'user_data')