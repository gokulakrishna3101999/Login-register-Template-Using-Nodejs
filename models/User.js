const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    password:{
        type:String
    }
})

const User = mongoose.model('User',userSchema);

module.exports = User;