const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');

router.get('/', authController.show);
router.get('/logout', authController.logout_get);
router.post('/signup', authController.signup_post);
router.post('/signin', authController.signin_post);

module.exports = router;
