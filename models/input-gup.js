const mongoose = require('mongoose')
const Schema = mongoose.Schema

const inputGupSchema = new Schema ({
    jenisSpby: String,
    nomorSpby: Number,
    nomorNd: Number,
    nomorSt: Number,
    uraian: String,
    jumlahSpby: Number,
    ppk: String
    
})

module.exports = mongoose.model('input-gup', inputGupSchema)

// gg
