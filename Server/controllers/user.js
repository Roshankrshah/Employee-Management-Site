const connectDB = require('../db/connect');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLogin = (req, res) => {
    const sql = "SELECT * FROM users WHERE email = ? and password = ?";
    connectDB.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in running query" });
        if (result.length > 0) {
            const id = result[0].id;
            const token = jwt.sign({ role: "admin" }, process.env.JWT_SEC, { expiresIn: '1d' });
            res.cookie('token', token, {
                path: "/",
                expires: new Date(Date.now() + 1000 * 86400),
                sameSite: 'None',
                httpOnly: false,
                secure: true
            });
            return res.json({ Status: 'Success' })
        } else {
            return res.json({ Status: 'Error', Error: 'Wrong Email or Password' });
        }
    })
}

const createEmployee = (req, res) => {
    const sql = "INSERT INTO employee (`id`,`name`,`email`,`password`,`address`,`salary`,`image`) VALUES(?)";
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.json({ Error: "Error in hashing password" });

        const values = [
            req.body.id,
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.salary,
            req.file.filename
        ];

        connectDB.query(sql, [values], (err, result) => {

            if (err) {
                console.log(err);
                return res.json({ Error: "Inside signup query" });
            }
            return res.json({ Status: "Success" });
        })
    })
}

const employeeLogin = (req, res) => {
    const sql = "SELECT * FROM employee WHERE email = ?";

    connectDB.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in running query" });
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err, response) => {
                if (err) return res.json({ Error: "Invalid Credentials" });
                if (response) {
                    const token = jwt.sign({ role: "employee", id: result[0].id }, process.env.JWT_SEC, { expiresIn: '1d' });
                    res.cookie('token', token, {
                        path: "/",
                        expires: new Date(Date.now() + 1000 * 86400),
                        sameSite: 'None',
                        httpOnly: false,
                        secure: true
                    });
                    return res.json({ Status: "Success", id: result[0].id });
                } else {
                    return res.json({ Status: "Error", Error: "Wrong Email or Password" });
                }
            })
        } else {
            return res.json({ Status: "Error", Error: "Wrong Email or Password" });
        }
    })
}

const logoutUser = (req, res) => {
    res.cookie("token","",{
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "None",
        secure: true
    });
    return res.json({ Status: "Success" });
}

const adminCount = (req, res) => {
    const sql = "Select count(id) as admin from users";
    connectDB.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in running query" });
        return res.json(result);
    })
}

const employeeCount = (req, res) => {
    const sql = "Select count(id) as employee from employee";
    connectDB.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error in running query"});
        return res.json(result);
    })
}

const salarySum = (req, res) => {
    const sql = "Select sum(salary) as sumOfSalary from employee";
    connectDB.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error in running query"});
        return res.json(result);
    })
}

const getAllEmployee = (req, res) => {
    const sql = "SELECT * FROM employee";
    connectDB.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get employee error in sql"});
        return res.json({Status: "Success", Result: result})
    })
}

module.exports = {
    adminLogin,
    createEmployee,
    employeeLogin,
    logoutUser,
    adminCount,
    employeeCount,
    salarySum,
    getAllEmployee
}