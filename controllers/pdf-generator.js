const path = require('path');
const generateRandomUsers = require('../services/user-gen-service.js');
const { default: puppeteer } = require('puppeteer');
const pug = require('pug');

const generateRandomPDF = (req, res, next) => {
    try {
        generateRandomUsers().then(async (data) => {
            try {
                console.log(`---pdf generation func starts-----`);
                const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
                const page = await browser.newPage();
                let rootDir = __dirname.split('\\');
                rootDir.splice(rootDir.length - 1, 1);
                const templatePath = path.join(rootDir.join("\\"), './templates/i-card.pug');
                const html = pug.renderFile(templatePath, { data });
                await page.setContent(html, { waitUntil: 'domcontentloaded' });
                await page.pdf({
                    format: 'A4',
                    path: './public/id_cards.pdf',
                    printBackground: true,
                    margin: {
                        top: '20mm',
                        right: '20mm',
                        bottom: '20mm',
                        left: '20mm'
                    }
                });
                console.log(`PDF buffer generated`);
                await browser.close();
                console.log(`---pdf generation func end-----`);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify({
                    message: 'Random identity card PDF generated successfully',
                    status: true
                }));
                res.end();
                console.log(`---pdf generation response sent-----`);
            } catch (err) { next(err); }
        }).catch(err => next(err));
    }
    catch (err) { next(err); }
};

const downloadIDCardPDF = (req, res, next) => {
    try {
        console.log(`---pdf download method started-----`);
        let rootDir = __dirname.split('\\');
        rootDir.splice(rootDir.length - 1, 1); // * splicing last element = "controllers"
        const filePath = path.join(rootDir.join("\\"), 'public', 'id_cards.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=id_cards.pdf');
        res.sendFile(filePath, (err) => { if (err) next(err); });
        console.log(`---pdf download method ended-----`);
    } catch (err) { next(err); }
};

module.exports = { generateRandomPDF, downloadIDCardPDF };