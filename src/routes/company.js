const express = require('express');
const router = express.Router();
const fileUpload = require('../util/fileUpload')

const companyController = require('../app/controllers/CompanyController');

router.get('/stored/:id', companyController.stored);
router.get('/account/:id', companyController.showAccount);
router.get('/createJob/:id', companyController.create);
router.get('/first-step', companyController.firststep);
router.get('/trash/:id', companyController.trash);
router.get('/editJob/:id', companyController.editJob);
router.get('/editCompany/:id', companyController.editCompany);
router.get('/candidate/:slug', companyController.showlist);
router.get('/view-details/:id', companyController.showdetails);
router.get('/info/:id', companyController.showinfo);
router.put('/updateCompany/:id', fileUpload("./src/public/img/uploads"), companyController.updateCompany);
router.put('/:id', companyController.updateJob);
router.get('/create', companyController.createCom);
router.post('/store', companyController.store);
router.patch('/restore/:id', companyController.restoreJob);
router.delete('/:id', companyController.deleteJob);
router.delete('/force/:id', companyController.forceDeleteJob);

module.exports = router;


// router.post('/:id/changepwCompany', companyController.changepw);
// router.get('/:id/changepwCompany', companyController.changepwCompany);
