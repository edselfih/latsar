const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pajakSchema = new Schema ({
    duaSatu: Boolean,
    duaDua: Boolean,
    duaTiga: Boolean,
    final: Boolean,
    ppn: Boolean,

})

const lainLainSchema = new Schema ({
    lainLain: String
})

const daftarSPBySchema = new Schema ({
    jenisSPBy: String,
    jenis: String,
    ttdPPK: String,
    pengeluaranRiil: String,
    persetujuanPBJ: String,
    spd: String,
    memoPerintahBayar: String,
    permohonanPembayaran: String,
    notaDinas: String,
    suratTugas: String,
    kesesuaianSBM: String,
    buktiPembayaranKKP: String,
    absensi: String,
    spj: String,
    rincianTransport: String,
    pajak: [pajakSchema],
    // lainLain: [lainLainSchema]
})

module.exports = mongoose.model('Daftar-SPBy', daftarSPBySchema)

// gg