const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/', siteController.index);
router.get('/introduce', siteController.introduce);
router.get('/contact', siteController.contact);

module.exports = router;
