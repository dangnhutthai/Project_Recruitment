const express = require('express');
const router = express.Router();

const companyController = require('../app/controllers/CompanyController');

router.get('/stored/:id', companyController.stored);
router.get('/account/:id', companyController.showDetails);
router.get('/createJob/:id', companyController.create);
router.get('/first-step', companyController.firststep);
router.get('/trash/:id', companyController.trash);
router.get('/:id/editJob', companyController.editJob);
router.get('/:id/editCompany', companyController.editCompany);
router.put('/:id', companyController.updateJob);
router.get('/create', companyController.createCom);
router.post('/store', companyController.store);
router.patch('/:id/restore', companyController.restoreJob);
router.delete('/:id', companyController.deleteJob);
router.delete('/:id/force', companyController.forceDeleteJob);

module.exports = router;
