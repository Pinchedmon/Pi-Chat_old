const Router = require('express');
const router = new Router();
const controller = require('./Controllers/postController');
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
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});


router.post('/feed', upload.single('post'), controller.postUpload);
router.get('/feed', controller.getFeed);

router.get('/getMyPosts', controller.getMyPosts);
router.get('/postInfo', controller.getPostInfo);
router.get('/postComments', controller.getPostComments);
router.get('/post', controller.getPost);
router.put('/feed', controller.likePost);
router.delete('/feed', controller.deletePost);

module.exports = () => router;