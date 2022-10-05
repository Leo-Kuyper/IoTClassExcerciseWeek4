const mongoose = require('mongoose');

const addLightReading = mongoose.Schema({
    name: { type: String, required: true},
    light: { type: Number, required: true},
    time : { type : Date, default: Date.now }
});

module.exports = mongoose.model('light-reading', addLightReading);