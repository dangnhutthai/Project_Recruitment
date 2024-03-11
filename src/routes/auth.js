const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');

router.get('/', authController.show);
router.post('/signup', authController.signup_post);
router.post('/signin', authController.signin_post);
router.get('/logout', authController.logout_get);

module.exports = router;
