const express = require('express');
const router = express.Router();

const emailController = require('../app/controllers/EmailController');

router.post('/eject', emailController.sendEjectMail);
router.post('/apply', emailController.sendApplyMail);

module.exports = router;
