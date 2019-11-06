const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorsSchema = new mongoose.Schema({
    email: {
        type: String
    },
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    address: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    doctorType: {
        type: String
    },
    lat: {
        type: Number
    },
    lon: {
        type: Number
    }
});

module.exports = mongoose.model('doctors', DoctorsSchema);
