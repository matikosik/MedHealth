const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CalendarSchema = new mongoose.Schema({
    email: {
        type: String
    },
    emailDocotor: {
        type: String
    },
    day: {
        type: String
    },
    month: {
        type: String
    },
    year: {
        type: String
    },
    event: {
        type: String
    }
});

module.exports = mongoose.model('calendar', CalendarSchema);