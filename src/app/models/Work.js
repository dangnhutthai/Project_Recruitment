const mongoose = require('mongoose')
const schema = mongoose.Schema;

const Work = {
    userId: {
        type: String
    },

    userEmail: {
        type: String
    },

    jobId: {
        type: String
    },

    applydate: {
        type: Date,
        default: Date.now()
    },

    isAccept: {
        type: Boolean,
        default: false
    },

    name: {
        type: String
    },

    interviewDate: {
        type: Date,
    },

    interviewAddress: {
        type: String,
    },

    slug: {
        type: String
    }
}

module.exports = mongoose.model('Work', Work)