const path = require('path');
const multer  = require('multer');

var storage = multer.diskStorage({
    destination:(req,file,cb) => {
      cb(null,'uploads/')
    },
    filename:(req,file,cb) => {
        let ext = path.extname(file.originalname)
        cb(null,Date.now()+ext)
    }
});


var upload = multer({
    storage:storage, 
    fileFilter:(req,file,cb) => {
        if(file.mimetype=="image/png" || file.mimetype=="image/jpg")
        cb(null,true);
        else
        {
        console.log("only jpg and png files are supported");
        cb(null,false)
        }
    },
    limits:{
        fileSize:2160*2160*20
    }
})

module.exports = upload; 