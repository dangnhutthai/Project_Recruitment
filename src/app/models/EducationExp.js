const mongoose = require('mongoose')
const schema = mongoose.Schema;

const EducationExp = new schema({
    certificate: {
        type: String,
    },

    brand: {
        type: String,
    },

    graduationday: {
        type: Date,
    },

    school: {
        type: String,
    },

    idseeker: {
        type: String,
    },

});

module.exports = mongoose.model('EducationExp', EducationExp)