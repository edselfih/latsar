const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    nomorkwitansi: String,
    pajak: {
        duaSatu: String,
        duaDua: String,
        duaTiga: String,
        final: String,
        ppn: String,
    },
    lainlain: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Lainlain'
        }
    ]
})

module.exports = mongoose.model('Daftar-SPBy', daftarSPBySchema)

// gg