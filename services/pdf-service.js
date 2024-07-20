const fs = require('fs');
const generateRandomUsers = require('./user-gen-service');
const puppeteer = require('puppeteer');

function generatePDF() {
  generateRandomUsers().then(async (response) => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    let htmlContent = `<html><body><div style="page-break-after: always;">`;
    for (let i = 1; i <= response.data.length; i++) {
      htmlContent += `
              <h1>Page ${i}</h1>
              <p>This is the content for page ${i}. This page can contain dynamic content as needed.</p>
              <div style="page-break-after: always;"></div>
          `;
    }
    htmlContent += `</div></body></html>`;
    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });
    const pdfBuffer = await page.pdf({
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
    await browser.close();
  }).catch(err => console.log(err));
}
module.exports = { generatePDF };
