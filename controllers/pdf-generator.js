const { generatePDF } = require('../services/pdf-service.js');
const path = require('path');

const generateRandomPDF = (req, res, next) => {
    generatePDF()
};

const downloadIDCardPDF = (req, res, next) => {
    let rootDir = __dirname.split('\\');
    rootDir.splice(rootDir.length - 1, 1); // * splicing last element = "controllers"
    const filePath = path.join(rootDir.join("\\"), 'public', 'id_cards.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=id_cards.pdf');
    res.sendFile(filePath, (err) => { if (err) next(err); });
};

module.exports = { generateRandomPDF, downloadIDCardPDF };