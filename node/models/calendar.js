const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CalendarSchema = new mongoose.Schema({
    email: {
        type: String
    },
    doctor: {
        type: String
    },
    event: {
        type: String
    },
    day: {
        type: Number
    },
    month: {
        type: Number
    },
    year: {
        type: Number
    }
});

module.exports = mongoose.model('calendar', CalendarSchema);