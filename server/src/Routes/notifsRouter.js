const Router = require('express')
const router = new Router()
const controller = require('./Controllers/notifsController')

router.get('/', controller.getNotifs);
router.post('/read', controller.readNotif);

module.exports = router;