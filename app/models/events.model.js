const mongoose = require('mongoose');
let eventSchema = mongoose.Schema({
    eventname: String,
    description: String,
    eventmanager: String,
    url: String,
    tags: [String],
    likes: Number,
    img: String
});

module.exports = mongoose.model('Events', eventSchema, 'events');