const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegisterSchema = new mongoose.Schema({
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    rptpassword: {
        type: String
    },
    mop: {
        type: String
    },
    gender: {
        type: String
    }
});

module.exports = mongoose.model('register', RegisterSchema);