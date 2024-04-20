const express = require('express');
const router = express.Router();
const fileUpload = require('../util/fileUpload');
const seekerController = require('../app/controllers/SeekerController');

router.get('/first-step', seekerController.firstview);
router.get('/question', seekerController.question);
router.get('/create', seekerController.create);
router.get('/myjob/:id', seekerController.showmyjob);
router.post('/storeinfo', seekerController.storeinfo);
router.get('/createeduexp/:id', seekerController.createeduexp);
router.post('/storeeduexp/:id', seekerController.storeeduexp);
router.get('/createworkexp/:id', seekerController.createworkexp);
router.post('/storeworkexp/:id', seekerController.storeworkexp);
router.get('/account/:id', seekerController.showaccount);
router.delete('/workexp/:id', seekerController.deleteWork);
router.delete('/eduexp/:id', seekerController.deleteEdu);
router.get('/editWorkExp/:id', seekerController.showeditwork);
router.get('/editinfo/:id', seekerController.showeditinfo);
router.put('/updateinfo/:id', fileUpload("./src/public/img/uploads"), seekerController.updateinfo);
router.get('/editeduexp/:id', seekerController.showeditedu);
router.put('/editeduexp/:id', seekerController.updateeduexp);
router.put('/editworkexp/:id', seekerController.updateworkexp);

module.exports = router;
