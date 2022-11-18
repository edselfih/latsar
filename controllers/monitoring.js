const InputGup = require("../models/input-gup.js");
const DaftarSpby = require("../models/input_daftar-spby.js");
const DaftarPpk = require("../models/input_daftar-ppk")

module.exports.index = async (req, res) => {
  const inputedGups = await InputGup.find({}).populate("checked");
  const daftarPpk = await DaftarPpk.find({})
  checked = inputedGups.checked
  res.render("./monitoring/index", { inputedGups, checked, daftarPpk });
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
