const express = require('express');
const router = express.Router();

const companyController = require('../app/controllers/CompanyController');

router.get('/stored', companyController.stored);
router.get('/account/:id', companyController.showDetails);
router.get('/createJob', companyController.create);
router.get('/trash', companyController.trash);
router.get('/:id/editJob', companyController.editJob);
router.get('/:id/editCompany', companyController.editCompany);
router.get('/create', companyController.createCom);
router.post('/store', companyController.store);
router.patch('/:id/restore', companyController.restoreJob);
router.delete('/:id', companyController.deleteJob);
router.delete('/:id/force', companyController.forceDeleteJob);

module.exports = router;
