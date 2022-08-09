const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lainlainSchema = new Schema ({
    desc: String
})


module.exports = mongoose.model('Lainlain', lainlainSchema)

// gg