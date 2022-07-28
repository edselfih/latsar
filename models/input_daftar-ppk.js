const mongoose = require('mongoose')
const Schema = mongoose.Schema

const daftarPpkSchema = new Schema ({
    namaPpk: String,
    nip: Number,
    
})

module.exports = mongoose.model('Daftar-ppk', daftarPpkSchema)

// gg
