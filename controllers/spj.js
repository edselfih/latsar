const fs = require('fs')
const path = require('path')
const utils = require('util')
const puppeteer = require('puppeteer')
const hb = require('handlebars')
const readFile = utils.promisify(fs.readFile)
const DaftarSPJ = require("../models/daftar-spj");
let ejs = require("ejs");
let pdf = require("html-pdf");


module.exports.index = (req, res) => {
    res.render('./spj/spj.ejs')
}

module.exports.createSPJ = async (req, res) => {
    const spj = new DaftarSPJ(req.body);
    await spj.save();
    ejs.renderFile(path.join(__dirname, '../views/spj/', "spj-submited.ejs"), {spj : req.body },
    (err, data) => {
    if (err) {
        res.send(err.message);
    } else {
        let options = {
            "height": "11.25in",
            "width": "8.5in",
            "header": {
                "height": "20mm",
            },
            "footer": {
                "height": "20mm",
            },

        };
        pdf.create(spj, options).toFile("./download/spj.pdf", function (err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send("File created successfully");
            }
        });
    }
});
}

module.exports.downloadSPJ = (req, res) => {
};