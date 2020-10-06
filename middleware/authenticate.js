const jwt = require('jsonwebtoken');

const authenticate = (req,res,next) => {
    try{
      const token = req.headers.authorization.split(' ')[1];
      const decode = jwt.verify(token,'yofuckers');

      req.user = decode;
      next();
    }
    catch(error){
      res.status(400).json({
          message:"Authencation Failed"
      })
    }
}


module.exports = authenticate;