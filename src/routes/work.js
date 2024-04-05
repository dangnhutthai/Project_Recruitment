const express = require('express');
const router = express.Router();

const WorkController = require('../app/controllers/WorkController');


router.post('/:id/applyJob', WorkController.store);
router.patch('/eject/:id', WorkController.eject);
router.patch('/accept/:id', WorkController.accept);


module.exports = router;
