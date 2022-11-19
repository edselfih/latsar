const InputGup = require("../models/input-gup.js");
const DaftarSpby = require("../models/input_daftar-spby.js");
const DaftarPpk = require("../models/input_daftar-ppk");

module.exports.index = async (req, res) => {
  const filter = req.query.filter
  const session = req.session
  let inputedGups = await InputGup.find({}).populate("checked");
  const daftarPpk = await DaftarPpk.find({})
  checked = inputedGups.checked
  res.render("./monitoring/index", { inputedGups, checked, daftarPpk , filter, session});
};

module.exports.indexFilter = async (req, res) => {
  const daftarPpk = await DaftarPpk.find({})
  const filter = req.query.filter
  let ppk = []
  let kelengkapan = []
  if (req.body.valueFilter && req.body.valueFilter.daftarPpk) {
    ppk = req.body.valueFilter.daftarPpk
  }
  if (req.body.valueFilter && req.body.valueFilter.kelengkapan) {
    kelengkapan = req.body.valueFilter.kelengkapan
  }
  if (req.body.valueFilter && req.body.valueFilter.daftarPpk && req.body.valueFilter.daftarPpk.includes('all')) {
    const listPpk = []
    for (e of daftarPpk) {
      listPpk.push(e.namaPpk)
      ppk = listPpk
    }
  }
  if (req.body.valueFilter && req.body.valueFilter.daftarPpk && req.body.valueFilter.daftarPpk.includes('none')) {
    ppk = []
  }
  if (req.body.valueFilter && req.body.valueFilter.kelengkapan && req.body.valueFilter.kelengkapan.includes('all')) {
    const listKelengkapan = [
      'Lengkap dan Sesuai',
      'Belum Lengkap',
      'Belum Sesuai',
      'Belum Lengkap dan Sesuai'
    ]
    kelengkapan = listKelengkapan
  }
  if (req.body.valueFilter && req.body.valueFilter.kelengkapan && req.body.valueFilter.kelengkapan.includes('none')) {
    kelengkapan = []
  }
  let inputedGups = ''
  if (ppk) {
    inputedGups = await InputGup.find({ppk}).populate("checked");
  }
  if (kelengkapan) {
    inputedGups = await InputGup.find({kelengkapan}).populate("checked");
  }
  if (kelengkapan && ppk) {
    inputedGups = await InputGup.find({kelengkapan, ppk}).populate("checked");
  }
  const session = req.session
  session.filterCheck = {ppk, kelengkapan}
  console.log(`ini session ${session.filterCheck}`)
  checked = inputedGups.checked
  // const util = require('util') 
  // console.log(util.inspect(session, false, null, true))
  res.render("./monitoring/index", { inputedGups, checked, daftarPpk , filter, session});
};
module.exports.indexSearch= async (req, res) => {
  const filter = req.query.filter
  const nomorSpby = req.body.valueFilter.nomorSpby
  const inputedGups = await InputGup.find({nomorSpby}).populate("checked");
  const daftarPpk = await DaftarPpk.find({})
  checked = inputedGups.checked
  res.render("./monitoring/index", { inputedGups, checked, daftarPpk , filter});
};

module.exports.detailSpby = async (req, res) => {
  const { id } = req.params;
  const inputedGups = await InputGup.findById(id).populate("checked");
  checked = inputedGups.checked
  const jenisSpbys = await DaftarSpby.findOne({
    jenisSPBy: inputedGups.jenisSpby,
  }).populate('lainlain');
  const jumlahKwitansi = checked.jumlahSpby
  const jenisSpby = jenisSpbys.toObject()
  const lainlain = jenisSpby.lainlain 
  delete jenisSpby._id
  delete jenisSpby.jenis
  delete jenisSpby.jenisSPBy
  delete jenisSpby.lainlain
  delete jenisSpby.pajak
  delete jenisSpby.__v

  res.render(`./monitoring/detail`, { inputedGups, jenisSpby, checked, jumlahKwitansi, lainlain });
};
