import multer, { diskStorage } from 'multer'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const storage=multer.diskStorage({
    destination:function(req,res,cb){
       cb(null, path.join(__dirname, '..', 'images'));
    },

    filename:function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix+path.extname(file.originalname))
    }
})

export const upload = multer({ storage });