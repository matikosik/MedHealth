const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AvailabilitySchema = new mongoose.Schema({
    doctor: {
        type: String
    },
    days: {
        type: String
    },
    hours: {
        type: Number
    }
});

module.exports = mongoose.model('availability', AvailabilitySchema);