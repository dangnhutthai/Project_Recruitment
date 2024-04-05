const mongoose = require('mongoose')
const schema = mongoose.Schema;

const WorkExp = new schema({
    companyname: {
        type: String,
    },

    position: {
        type: String,
    },

    startday: {
        type: Date,
    },

    endday: {
        type: Date
    },

    companyaddress: {
        type: String,
    },

    idseeker: {
        type: String,
    },

});

module.exports = mongoose.model('WorkExp', WorkExp)