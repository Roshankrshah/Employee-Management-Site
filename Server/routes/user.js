const express = require('express');
const router = express.Router();
const {adminLogin} = require('../controllers/user');

router.get('/login',adminLogin);

module.exports = router;