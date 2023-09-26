const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { 
    adminLogin, 
    createEmployee, 
    employeeLogin, 
    logoutUser,
    adminCount,
    employeeCount,
    salarySum,
    getAllEmployee,
    deleteEmployee,
    getSingleEmployee,
    update } = require('../controllers/user');

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
});

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "You are no Authenticated" });
    } else {
        jwt.verify(token, process.env.JWT_SEC, (err, decoded) => {
            if (err) return res.json({ Error: "Token wrong" });
            req.role = decoded.role;
            req.id = decoded.id;
            next();
        })
    }
};


router.post('/login', adminLogin);
router.post('/create', upload.single('image'), createEmployee);
router.post('/employeeLogin', employeeLogin);
router.get('/logout', logoutUser);
router.get('/adminCount',verifyUser,adminCount)
router.get('/employeeCount',verifyUser,employeeCount)
router.get('/salarySum',verifyUser,salarySum);
router.get('/getEmployee',verifyUser,getAllEmployee)
router.delete('/delete/:id',verifyUser,deleteEmployee);
router.get('/getSingleEmployee/:id',verifyUser,getSingleEmployee);
router.patch('/update/:id',update)

module.exports = router;