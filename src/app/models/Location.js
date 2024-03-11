const mongoose = require('mongoose')
const schema = mongoose.Schema;

const Location = {
    name: { type: String }
}

module.exports = mongoose.model('Location', Location)