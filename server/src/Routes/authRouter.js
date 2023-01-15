const Router = require('express')
const router = new Router()
const controller = require('./Controllers/authController')
const authMiddleware = require('../Middlewares/authMiddleware')


router.post('/registration', controller.registration);
router.post('/login', controller.login);
//router.get('/users', authMiddleware, roleMiddleware(['admin']), controller.getUsers)
router.get('/user', authMiddleware, controller.getUser)

module.exports = router;