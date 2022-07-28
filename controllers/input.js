const DaftarPpk = require('../models/input_daftar-ppk.js');
const JenisSpby = require('../models/input_daftar-spby.js');

module.exports.index = (req, res) => {
  res.render("./input/index");
};

// Daftar PPK:

module.exports.daftarPpk = async (req, res) => {
  const daftarPpks= await DaftarPpk.find({});
  res.render('./input/daftar-ppk.ejs', {daftarPpks});
};

module.exports.createDaftarPpk = async (req, res) => {
  const newPpk = new DaftarPpk(req.body);
  await newPpk.save();
  res.redirect('/input/daftar-ppk');
};

// Jenis SPBy:

module.exports.jenisSpby = async (req, res) => {
  const jenisSpbys= await JenisSpby.find({})
  res.render("./input/jenis-spby", {jenisSpbys});
};

module.exports.createJenisSpby = async (req, res) => {
  const newSpby = new JenisSpby(req.body);
  await newSpby.save();
  res.redirect('/input/jenis-spby');
};

// GUP Tunai:

module.exports.gupTunai = async (req, res) => {
  const daftarPpks= await DaftarPpk.find({});
  res.render("./input/gup-tunai", {daftarPpks});
};

module.exports.gupTunai = async (req, res) => {
  const daftarPpks= await DaftarPpk.find({});
  res.render("./input/gup-tunai", {daftarPpks});
};



