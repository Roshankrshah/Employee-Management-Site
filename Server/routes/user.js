const express = require('express');
const router = express.Router();
const { adminLogin, createEmployee,employeeLogin } = require('../controllers/user');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})

router.post('/login', adminLogin);
router.post('/create', upload.single('image'), createEmployee);
router.post('/employeeLogin',employeeLogin);

module.exports = router;