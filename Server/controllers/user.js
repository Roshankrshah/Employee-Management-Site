const connectDB = require('../db/connect');

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

module.exports = {
    adminLogin,
}