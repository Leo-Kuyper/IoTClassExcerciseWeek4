const mongoose = require('mongoose');

const relayState = mongoose.Schema({
    name: { type: String, required: true},
    relay: { type: Boolean, required: true},
});

module.exports = mongoose.model('relay-state', relayState);