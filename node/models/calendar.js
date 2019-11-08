const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CalendarSchema = new mongoose.Schema({
    email: {
        type: String
    },
    emailDocotor: {
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
    },
    when: {
        type: Number
    }
});

module.exports = mongoose.model('calendar', CalendarSchema);