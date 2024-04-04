const multer = require('multer')
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        const allowFileTypes = ['image/png','image/jpeg','image/jpg','image/svg']
        const fileType = file.mimetype;
        if(!allowFileTypes.includes(fileType)){
            cb(new Error('this file is not accepted'))
        }else{
            cb(null,'./uploads') //error as first argument and success as second argument
        }
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname);
    }
})
module.exports={
    multer,
    storage
}