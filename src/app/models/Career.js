const mongoose = require('mongoose')
const schema = mongoose.Schema;

const Career = {
    name: { type: String }
}

module.exports = mongoose.model('Career', Career)