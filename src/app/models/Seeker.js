const mongoose = require('mongoose')
const schema = mongoose.Schema;

const Seeker = new schema({
    name: {
        type: String,
    },

    birthday: {
        type: Date,
    },

    gender: {
        type: String,
    },

    phone: {
        type: Number
    },

    cvurl: {
        type: String,
    },

    address: {
        type: String,
    },

    idseeker: {
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

module.exports = mongoose.model('Seeker', Seeker)