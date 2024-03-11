const mongoose = require('mongoose')
const schema = mongoose.Schema;

const Type = {
    name: { type: String }
}

module.exports = mongoose.model('Type', Type)