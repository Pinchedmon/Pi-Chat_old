const jwt = require('jsonwebtoken')
const { secret } = require('../config')
module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        };
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(403).json({
                    message: "Пользователь не авторизован"
                })
            }
            const { roles: userRoles } = jwt.verify(token, secret)
            if (userRoles !== 'admin') {
                return res.status(403).json({ message: "У вас нет доступа" })
            }
            next()
        } catch (error) {
            console.log(error)
            return res.status(403).json({ message: "Пользователь не авторизован" })
        }
    }
} 