const mongoose = require('mongoose')
const schema = mongoose.Schema;

const Company = new schema({
    name: {
        type: String,
    },

    founding: {
        type: Date,
    },

    introduce: {
        type: String,
    },

    address: {
        type: String,
    },

    phone: {
        type: Number
    },

    weburl: {
        type: String,
    },

    idcom: {
        type: String,
    },

    imageurl: {
        type: String,
        default: 'new',
    },

    image: {
        type: String,
        default: 'new',
    }
});

module.exports = mongoose.model('Company', Company)