const connectDB = require('../db/connect');
const bcrypt = require('bcrypt');

const adminLogin = (req,res)=>{
    const sql = "SELECT * FROM users WHERE email = ? and password = ?";
    connectDB.query(sql,[req.body.email,req.body.password],(err,result)=>{
        if(err) return res.json({Status: "Error",Error: "Error in running query"});
        if(result.length>0){
            return res.json({Status: 'Success'})
        }else{
            return res.json({Status: 'Error',Error: 'Wrong Email or Password'});
        }
    })
}

const createEmployee = (req,res)=>{
    const sql = "INSERT INTO employee (`id`,`name`,`email`,`password`,`address`,`salary`,`image`) VALUES(?)";
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err) return res.json({Error: "Error in hashing password"});

        const values = [
            req.body.id,
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.salary,
            req.file.filename
        ];

        connectDB.query(sql,[values],(err,result)=>{

            if(err){
                console.log(err);
                return res.json({Error: "Inside signup query"});
            }
            return res.json({Status: "Success"});
        })
    })
}

module.exports = {
    adminLogin,
    createEmployee
}