const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CalendarSchema = new mongoose.Schema({
    email: {
        type: String
    },
    doctor: {
        type: String
    },
    doctor2: {
        type: String
    },
    event: {
        type: String
    },
    date: {
        type: String
    },
    color: {
        type: String
    }
});

module.exports = mongoose.model('calendar', CalendarSchema);