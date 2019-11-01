const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegisterSchema = Schema({
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
    }
});

module.exports = mongoose.model('register', RegisterSchema);
