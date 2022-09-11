const InputGup = require("../models/input-gup.js");
const DaftarSpby = require("../models/input_daftar-spby.js");

module.exports.index = async (req, res) => {
  const inputedGups = await InputGup.find({});
  res.render("./monitoring/index", { inputedGups });
};

module.exports.detailSpby = async (req, res) => {
  const { id } = req.params;
  const inputedGups = await InputGup.findById(id).populate("checked");
  checked = inputedGups.checked
  const jenisSpbys = await DaftarSpby.findOne({
    jenisSPBy: inputedGups.jenisSpby,
  });
  const jenisSpby = jenisSpbys.toObject()
  delete jenisSpby._id
  delete jenisSpby.jenis
  delete jenisSpby.jenisSPBy
  delete jenisSpby.pajak
  delete jenisSpby.lainlain
  delete jenisSpby.__v
  res.render(`./monitoring/detail`, { inputedGups, jenisSpby, checked });
};
