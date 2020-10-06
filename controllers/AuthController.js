const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = (req,res,next) => {
    bcrypt.hash(req.body.password,10,(err,hashed_password) => {
        if(err)
        res.status(400).json({
            error:err.message
        })
        let user = new User({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:hashed_password
        });
        user.save().then((result) => {
            res.status(200).json({
                message:"Account Created successfully",
                result
            })
        }).catch(error => {
            res.status(400).json({
                error:error.message
            })
        })
    })
}


const login = (req,res,next) => {
   var username = req.body.username;
   var password = req.body.password;

   console.log(username);

   User.findOne({$or:[{name:username},{phone:username}]}).then((user) => {
       if(user)
       {
          bcrypt.compare(password,user.password,(err,result) => {
              if(err)
              res.status(400).json({
                  error:err.message
              })
              if(result)
              {
                  let token = jwt.sign({name:user.name},'yofuckers',{expiresIn:'24h'});
                  res.status(200).json({
                      message:"login successful",
                      token:token,
                      user
                  })
              }
              else{
                  res.status(400).json({
                      error:"password is incorrect"
                  })
              }
          })
       }
       else
       {
          res.status(200).json({
              message:"no user found or incorrect username"
          })
       }
   }).catch((error) => {
       res.status(400).json({
           error:error.message
       })
   })
}


module.exports = {register,login};