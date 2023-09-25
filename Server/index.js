require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/connect');
const userRoute = require('./routes/user');

const app = express();

app.use(cors({
    methods: ['GET','POST','PATCH','DELETE'],
    origin: true,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

connectDB.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('DB ' + connectDB.state);
});

app.get('/',(req,res)=>{
    res.send('Starting the Employee Management Project');
});

app.use('/user',userRoute);


const port = 2222 || process.env.PORT;

app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`);
});

