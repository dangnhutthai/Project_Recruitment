const mongoose = require('mongoose')
const schema = mongoose.Schema;

const Level = {
    name: { type: String }
}

module.exports = mongoose.model('Level', Level)