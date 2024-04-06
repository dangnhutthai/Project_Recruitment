const express = require('express');
const router = express.Router();

const jobController = require('../app/controllers/JobController');

router.post('/store', jobController.store);
router.get('/search', jobController.search);
router.get('/:slug', jobController.show);


module.exports = router;
