const InputGup = require("../models/input-gup.js");
const DaftarSpby = require("../models/input_daftar-spby.js");
const DaftarPpk = require("../models/input_daftar-ppk");
const { collection } = require("../models/input-gup.js");

module.exports.index = async (req, res) => {
  const filter = req.query.filter
  let inputedGups = await InputGup.find({}).populate("checked");
  const daftarPpk = await DaftarPpk.find({})
  checked = inputedGups.checked
  res.render("./monitoring/index", { inputedGups, checked, daftarPpk , filter});
};

module.exports.indexFilterPpk = async (req, res) => {
  const filter = req.query.filter
  const valueFilter = req.body.valueFilter
  const inputedGups = await InputGup.find({ppk: valueFilter }).populate("checked");
  const daftarPpk = await DaftarPpk.find({})
  checked = inputedGups.checked
  res.render("./monitoring/index", { inputedGups, checked, daftarPpk , filter});
};
module.exports.indexFilterKelengkan = async (req, res) => {
  const filter = req.query.filter
  const valueFilter = req.body.valueFilter
  const inputedGups = await InputGup.find({kelengkapan: valueFilter }).populate("checked");
  const daftarPpk = await DaftarPpk.find({})
  checked = inputedGups.checked
  res.render("./monitoring/index", { inputedGups, checked, daftarPpk , filter});
};
module.exports.indexFilterNomorSpby = async (req, res) => {
  const filter = req.query.filter
  console.log(filter)
  const valueFilter = req.body.valueFilter
  const inputedGups = await InputGup.find({nomorSpby: valueFilter }).populate("checked");
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
