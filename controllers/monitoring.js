const InputGup = require("../models/input-gup.js");
const DaftarSpby = require("../models/input_daftar-spby.js");
const DaftarPpk = require("../models/input_daftar-ppk");

module.exports.index = async (req, res) => {
  const filter = req.query.filter
  let inputedGups = await InputGup.find({}).populate("checked");
  const daftarPpk = await DaftarPpk.find({})
  checked = inputedGups.checked
  res.render("./monitoring/index", { inputedGups, checked, daftarPpk , filter});
};

module.exports.indexFilter = async (req, res) => {
  const filter = req.query.filter
  const ppk = req.body.valueFilter.daftarPpk
  const kelengkapan = req.body.valueFilter.kelengkapan
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
  const daftarPpk = await DaftarPpk.find({})
  checked = inputedGups.checked
  res.render("./monitoring/index", { inputedGups, checked, daftarPpk , filter});
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
