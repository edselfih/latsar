const mongoose = require('mongoose')
const Schema = mongoose.Schema

const daftarSPByInputSchema = new Schema ({
    jumlahSpby: Number,
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
    pajakNpwp: String,
    pajakRekanan: String,
    pajakJumlah: String,
})

module.exports = mongoose.model('DaftarSPByInput', daftarSPByInputSchema)

// gg