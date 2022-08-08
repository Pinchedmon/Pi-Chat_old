const Router = require('express');
const router = new Router();
const controller = require('./Controllers/postController');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const DIR = './public';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {

        cb(null, uuidv4() + '-' + file.originalname)
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
router.post('/comment', upload.single('comment'), controller.commentUpload);
router.get('/feed', controller.getFeed);
router.get('/getMyPosts', controller.getMyPosts);
router.get('/post', controller.getPost);
router.put('/feed', controller.likePost);
router.put('/comment', controller.likeComment)
router.delete('/feed', controller.deletePost);
router.delete('/comment', controller.deleteComment);

module.exports = router;