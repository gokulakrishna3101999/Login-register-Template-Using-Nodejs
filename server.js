const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const morgan = require('morgan')
const port = process.env.port || 4000
const app = express();

const employeeRoutes = require('./routes/employee')
const authRoutes = require('./routes/auth')

mongoose.connect("mongodb://localhost/test_database",
    {
      useNewUrlParser:true,
      useUnifiedTopology: true,
      useCreateIndex:true,
      useFindAndModify:true,
    }).then(() => {
      console.log("database connected");
    });

    mongoose.connection.on('error',err => {
      console.log(`error ${err.message}`);
    })

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads')); 
app.use('/api/employee',employeeRoutes)
app.use('/api/auth',authRoutes); 

app.listen(port,()=>{
    console.log(`server connected on ${port}`);
})