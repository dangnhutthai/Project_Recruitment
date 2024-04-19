const mongoose = require('mongoose')
const schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
const methodOverride = require('method-override');

const Work = new schema ({
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
})

Work.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('Work', Work)