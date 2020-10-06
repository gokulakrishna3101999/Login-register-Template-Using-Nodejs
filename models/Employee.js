const mongoose = require('mongoose');
const schema = mongoose.Schema;


const employeeSchema = new schema({
    name:{
        type:String,
    },
    designation:{
        type:String,
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    age:{
        type:Number
    },
    avatar:{
        type:String,
    }
}, {timestamps : true});

const Employee = mongoose.model('Employee',employeeSchema);
module.exports = Employee;

