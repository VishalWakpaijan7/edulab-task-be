const express = require('express');
const pdfGenerator  = require('../controllers/pdf-generator');
const router = express.Router();

router.get('/generate_id_cards', pdfGenerator.generateRandomPDF);
router.get('/download_id_cards', pdfGenerator.downloadIDCardPDF);

module.exports = router;