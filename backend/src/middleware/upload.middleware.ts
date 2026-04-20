import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads')
    },
    filename: function (req,file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

export const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb){
        const ext = path.extname(file.originalname);
        if(ext!=='.xlsx' && ext! =='.xls'){
            return cb(new Error('Only Excel files are allowed'));
        }
        cb(null, true)
    }
})