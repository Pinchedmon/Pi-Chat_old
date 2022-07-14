const Router = require('express')
const router = new Router()
const controller = require('./authController')
const { check } = require('express-validator')
const authMiddleware = require('./Middlewares/authMiddleware')
const roleMiddleware = require('./Middlewares/roleMiddleware')
router.post('/registration', [check('name', 'Имя пользователя не может быть пустым').notEmpty(),
check('email', 'Поле почты не может быть пустое').notEmpty(),
check('password', 'Пароль должен быть больше 4 и не меньше 10 символов').isLength({ min: 4, max: 10 })], controller.registration);
router.post('/login', controller.login);
router.get('/users', authMiddleware, roleMiddleware(['admin']), controller.getUsers)
router.get('/user', authMiddleware, controller.getUser)

module.exports = router;