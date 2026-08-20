const express = require('express');
const router = express.Router();
const {
  verifyCertificate,
  getMyCertificates,
  issueCertificate
} = require('../controllers/certificateController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

router.get('/verify/:id', verifyCertificate);
router.get('/my-certificates', protect, getMyCertificates);
router.post('/', protect, admin, issueCertificate);

module.exports = router;
