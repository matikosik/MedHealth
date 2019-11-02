const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorsSchema = Schema({
    email: {
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
    }
});

module.exports = mongoose.model('doctors', DoctorsSchema);
