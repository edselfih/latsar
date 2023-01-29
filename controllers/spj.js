const DaftarSpj = require("../models/daftar-spj");
const hbs = require('handlebars');
const fs = require('fs-extra');
const path = require('path');
const puppeteer = require('puppeteer');

module.exports.index = (req, res) => {
    res.render('./spj/honor-narsum.ejs')
}

module.exports.createSPJ = async (req, res) => {
    const newSpj = new DaftarSpj(req.body);
    await newSpj.save();
    const spj = {
        nama : newSpj.nama,
        nip : newSpj.nip,
        tanggalJalan : newSpj.tanggalJalan,
        tanggalPulang : newSpj.tanggalPulang,
        lamaPerjalanan : newSpj.lamaPerjalanan,
        tiketPP : newSpj.tiketPP,
        uangHarian : newSpj.uangHarian,
        penginapan : newSpj.penginapan,
        translokJakarta : newSpj.translokJakarta,
        translokTempatTujuan : newSpj.translokTempatTujuan,
        biayaLainnya : newSpj.biayaLainnya,
        uangRepresentatif : newSpj.uangRepresentatif,
        total : newSpj.uangRepresentatif
    }
    const compile = async function (templateName, spj) {
        const filePath = path.join(process.cwd(),'./views/spj/',`${templateName}.hbs`)
        const html = await fs.readFile(filePath,'utf8')
        return hbs.compile(html)(spj)
    }
    try{
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto('http://localhost:3000/spj')
        // const content = await compile('honor-narsum', spj)
        const content = '<h1>heyyy</h1>'
        await page.setContent(content, { waitUntil: "networkidle0" })
        await page.pdf({
            printBackground: true,
            headerTemplate: '<span style="font-size: 30px; width: 200px; height: 200px; background-color: black; color: white; margin: 20px;">Header 1</span>',
            footerTemplate: '<span style="font-size: 30px; width: 50px; height: 50px; background-color: red; color:black; margin: 20px;">Footer</span>',
            displayHeaderFooter: true,
            landscape: true,
            path:'output.pdf',
            format:'A4'
        });
        console.log("done creating pdf")
    } catch(e){
        console.log(e) 
    }
    res.render('./spj/spj-submited', {spj})
}

module.exports.downloadSPJ = (req, res) => {
    res.download('./docs/spj.pdf')
};