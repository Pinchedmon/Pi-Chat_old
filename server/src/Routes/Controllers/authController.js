const bcrypt = require('bcryptjs')
const sqlite = require('sqlite3').verbose();
const path = require('path');
const jwt = require('jsonwebtoken')
const { secret } = require("../../config");
const db = new sqlite.Database(path.resolve(__dirname, '../../db/posts.db'), sqlite.OPEN_READWRITE, (err) => { if (err) return console.error(err.message) });

const generateAccessToken = (ID, role) => {
    const payload = {
        id: ID,
        roles: role,
    }
    return jwt.sign(payload, secret)
}
class authController {
    async registration(req, res) {
        const { user } = req.body
        const hashPassword = bcrypt.hashSync(`${user.password}`, 1)
        db.all(`SELECT * FROM users WHERE name = "${user.name}" OR email = "${user.email}";`, [], (err, rows) => {
            if (rows.length === 0) {
                db.all("INSERT INTO users (name, username, info, email, password) VALUES (?, ?, ?, ?, ?)", [user.name, user.name, "Пользователь Pi-Chat", user.email, hashPassword], (err) => {
                    if (err) return res.json({
                        status: 400,
                        succes: false
                    })
                    db.all(`SELECT * FROM users WHERE name = "${user.name}"`, [], (err, rows) => {
                        const token = generateAccessToken(rows[0].ID, rows[0].roles);
                        console.log(rows)
                        return res.json({
                            status: 200,
                            // authToken: token,
                            success: true
                        })
                    })

                })
            } else return res.json({
                status: 400,
                message: "Такой пользователь уже существует"
            })
        });
    }
    async login(req, res) {
        const { session } = req.body;
        db.all(`SELECT ID, username, name, email, roles, pathImg, backImg, info  FROM users WHERE email = "${session.email}";`, [], (err, rows) => {
            if (rows === undefined) {
                return res.json({
                    status: 400,
                    message: `Пользователь с таким ${session.email} не найден`
                })
            }
            // const validPassword = bcrypt.compareSync(session.password, `${rows[0].password}`)
            // if (!validPassword) {
            //     return res.json({
            //         password: session.password,
            //         know: rows[0].password,
            //         status: 400,
            //         message: "Введён неверный пароль"
            //     })
            // }
            const token = generateAccessToken(rows[0].ID, rows[0].roles);
            return res.json({ status: 200, user: rows[0], authToken: token })
        });
    }
    async getUsers(req, res) {
        db.all('SELECT * FROM users', [], (err, rows) => {
            if (err) {
                return res.json({
                    status: 400
                })
            }
            return res.json({
                status: 200,
                "data": rows
            })

        })
    }
    async logout(req, res) {
        jwt.destroy(token)
    }
    async getUser(req, res) {
        if (req.user !== undefined) {
            const { id } = req.user
            db.all(`SELECT * FROM users WHERE ID = ${id}`, [], (err, rows) => {
                if (err) {
                    return res.json({
                        status: 400
                    })
                }
                return res.json({
                    status: 200,
                    "data": rows[0]
                })

            })
        }
    }
}
module.exports = new authController;