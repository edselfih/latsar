const mongoose = require('mongoose')
const Schema = mongoose.Schema

const daftarSPByInputSchema = new Schema ({
    jumlahSpby: Number,
    ttdPPK: {
        type: String,
        default: 'kosong'
    },
    pengeluaranRiil: {
        type: String,
        default: 'kosong'
    },
    persetujuanPBJ: {
        type: String,
        default: 'kosong'
    },
    spd: {
        type: String,
        default: 'kosong'
    },
    memoPerintahBayar: {
        type: String,
        default: 'kosong'
    },
    permohonanPembayaran: {
        type: String,
        default: 'kosong'
    },
    notaDinas: {
        type: String,
        default: 'kosong'
    },
    suratTugas: {
        type: String,
        default: 'kosong'
    },
    kesesuaianSBM: {
        type: String,
        default: 'kosong'
    },
    buktiPembayaranKKP: {
        type: String,
        default: 'kosong'
    },
    absensi: {
        type: String,
        default: 'kosong'
    },
    spj: {
        type: String,
        default: 'kosong'
    },
    rincianTransport: {
        type: String,
        default: 'kosong'
    },
    pajakNpwp: {
        type: String,
        default: 'kosong'
    },
    pajakRekanan: {
        type: String,
        default: 'kosong'
    },
    pajakJumlah: {
        type: String,
        default: 'kosong'
    },
    duaSatu: String,
    duaDua: String,
    duaTiga: String,
    final: String,
    ppn: String,
    kjsDuaSatu: String,
    kjsDuaDua: String,
    kjsDuaTiga: String,
    kjsFinal: String,
    kjsPpn: String,
    npwp: String,
    rekanan: String
})

module.exports = mongoose.model('DaftarSPByInput', daftarSPByInputSchema)

// gg