const DaftarPpk = require('../models/input_daftar-ppk.js');
const DaftarSpby = require('../models/input_daftar-spby.js');
const DaftarSpbyInputed = require('../models/input_daftar-spby-inputed.js');
const Lainlain = require('../models/input_daftar-spby-lainlain.js');
const InputGup = require('../models/input-gup.js');

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

module.exports.deleteDaftarPpk = async (req, res) => {
  const {ppkId} = req.params
  await DaftarPpk.findByIdAndRemove(ppkId);
  res.redirect(`/input/daftar-ppk`);
};

// Jenis SPBy:

module.exports.jenisSpby = async (req, res) => {
  const jenisSpbys= await DaftarSpby.find({}).populate('lainlain')
  const lainlain = await Lainlain.find({})
  console.log(lainlain)
  res.render("./input/jenis-spby", {jenisSpbys, lainlain});
};

module.exports.createJenisSpby = async (req, res) => {
  const newSpby = new DaftarSpby(req.body);
  await newSpby.save();
  // res.send(req.body)
  res.redirect('/input/jenis-spby');
};

module.exports.createJenisSpbyLainlain = async (req, res) => {
  const newLainlain = new Lainlain(req.body);
  await newLainlain.save()
  res.redirect('/input/jenis-spby');
};

// GUP Tunai:

module.exports.gup = async (req, res) => {
  const jenisSpbys= await DaftarSpby.find({}).populate('lainlain')
  const daftarPpks= await DaftarPpk.find({});
  res.render("./input/gup-tunai", {daftarPpks, jenisSpbys});
};

module.exports.createGup = async (req, res) => {
  const jumlah = req.body.gupTunai.jumlahSpby
  console.log(`ini jumlah ${jumlah}`)
  const newGup = new InputGup(req.body.gupTunai)
  newGup.jumlahSpby = jumlah.replaceAll('.', '')
  newGup.save()
  res.redirect(`/input/gup-tunai/${newGup._id}`);
};

module.exports.gupInputed = async (req, res) => {
  const {id} = req.params
  const inputedGup = await InputGup.findById(id)
  const daftarSpbys= await DaftarSpby.findOne({jenisSPBy: `${inputedGup.jenisSpby}`}).populate('lainlain')
  const daftarPpks= await DaftarPpk.find({});
  res.render("./input/gup-tunai-inputed", {daftarPpks, daftarSpbys, inputedGup ,id});
};

module.exports.checkedGupInputed = async (req, res) => {
  const jumlah = req.body.gup.jumlahSpby
  const {id} = req.params
  const daftarSpby = new DaftarSpbyInputed(req.body.gup)
  daftarSpby.jumlahSpby = jumlah.replaceAll('.', '')
  await daftarSpby.save()
  const inputedGups = await InputGup.findByIdAndUpdate(id, {checked : daftarSpby._id}).populate('checked')
  const jenisSpbys = await DaftarSpby.findOne({
    jenisSPBy: inputedGups.jenisSpby,
  });
  const jenisSpby = jenisSpbys.toObject()
  delete jenisSpby._id
  delete jenisSpby.jenis
  delete jenisSpby.jenisSPBy
  delete jenisSpby.pajak
  delete jenisSpby.__v

  for (let x in jenisSpby ) {
    if(daftarSpby[x] === 'kosong') {
      await InputGup.findByIdAndUpdate(id, {kelengkapan : 'Belum Lengkap'})
    }
  }
  res.redirect('/monitoring')
};


// update

module.exports.updateGupInputedPage = async (req, res) => {
  const {id} = req.params
  const inputedGup = await InputGup.findById(id).populate('checked')
  const daftarSpbys= await DaftarSpby.findOne({jenisSPBy: `${inputedGup.jenisSpby}`}).populate('lainlain')
  const daftarPpks= await DaftarPpk.find({});
  res.render("./input/update-spby", {daftarPpks, daftarSpbys, inputedGup ,id});
};

module.exports.updateGupInputed = async (req, res) => {
  const {id} = req.params
  const updatedChecked = req.body.gup
  updatedChecked.jumlahSpby = updatedChecked.jumlahSpby.replaceAll('.', '')
  console.log(updatedChecked.jumlahSpby)
  const daftarSpby = new DaftarSpbyInputed(updatedChecked)
  daftarSpby.save()
  const inputedGups = await InputGup.findById(id)
  await DaftarSpbyInputed.findByIdAndRemove(inputedGups.checked._id)
  inputedGups.checked = daftarSpby
  inputedGups.save()
  const jenisSpbys = await DaftarSpby.findOne({
    jenisSPBy: inputedGups.jenisSpby,
  });
  const jenisSpby = jenisSpbys.toObject()
  delete jenisSpby._id
  delete jenisSpby.jenis
  delete jenisSpby.jenisSPBy
  delete jenisSpby.pajak
  delete jenisSpby.__v
  for (let x in jenisSpby ) {
    
    if(daftarSpby[x]=== 'kosong' ) {
      await InputGup.findByIdAndUpdate(id, {kelengkapan : 'Belum Lengkap'})
      return res.redirect("/monitoring")
    }
    if(daftarSpby.lainlain.length !== jenisSpby.lainlain.length){
      await InputGup.findByIdAndUpdate(id, {kelengkapan : 'Belum Lengkap'})
      return res.redirect("/monitoring")
    }
    await InputGup.findByIdAndUpdate(id, {kelengkapan : 'Lengkap'})
  }
  res.redirect("/monitoring")
};

// delete
module.exports.gupInputedDelete = async (req, res) => {
  const {id} = req.params
  const inputedGups = await InputGup.findByIdAndRemove(id)
  if(inputedGups.checked) {
    await DaftarSpbyInputed.findByIdAndRemove(inputedGups.checked._id)
  }
  res.redirect("/monitoring")
};