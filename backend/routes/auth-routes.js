const express = require('express');
const router = express.Router();
const {signUp, login, me, logout} = require('../controller/auth-controller.js');

router.post('/signup', signUp);
router.post('/login', login);
router.get('/me', me);
router.post('/logout', logout);

module.exports = router;