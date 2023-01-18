const Router = require('express')
const router = new Router()
const controller = require('./Controllers/notifsController')

const multer = require('multer');
const upload = multer();


router.get('/', controller.getNotifs);
router.put('/read', upload.none(), controller.readNotif);

module.exports = router;