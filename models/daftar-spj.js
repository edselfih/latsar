const mongoose = require('mongoose')
const Schema = mongoose.Schema

const daftarSpjSchema = new Schema ({
    nama: String,
    nip: String,
    tanggalJalan: String,
    tanggalPulang: String,
    lamaPerjalanan: String,
    tiketPP: String,
    uangHarian: String,
    penginapan: String,
    translokJakarta: String,
    translokTempatTujuan: String,
    biayaLainnya: String,
    uangRepresentatif: String,
    total: String
})

module.exports = mongoose.model('DaftarSpj', daftarSpjSchema)
