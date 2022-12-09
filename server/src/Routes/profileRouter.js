const Router = require('express');
const router = new Router();
const controller = require('./Controllers/profileController')
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const DIR = './public/original';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + file.originalname.match(".(?:jpg|gif|jpeg|png)")[0])

    }
});
let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
router.put('/img', upload.single('avatar'), controller.setImg);
router.put('/backImg', upload.single('backImg'), controller.editBackground);
router.put('/name', controller.editUsername);
router.put('/info', controller.editInfo);
router.get('/user', controller.getUser);
router.get('/getMyUsername', controller.getMyUsername);
module.exports = router;