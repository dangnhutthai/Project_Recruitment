const express = require('express');
const router = express.Router();

const WorkController = require('../app/controllers/WorkController');


router.post('/:id/applyJob', WorkController.store);
router.get('/eject/:id', WorkController.eject);
router.get('/accept/:id', WorkController.accept);
router.get('/delete/:id', WorkController.delete);


module.exports = router;
