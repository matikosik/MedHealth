const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AvailabilitySchema = new mongoose.Schema({
    doctor: {
        type: String
    },
    days: {
        type: Array
    },
    hours: {
        type: Array
    }
});

module.exports = mongoose.model('availability', AvailabilitySchema);