const sqlite = require('sqlite3').verbose();
const path = require('path');
const { Database } = require('sqlite3');
const url = require('url');
const db = new sqlite.Database(path.resolve(__dirname, '../../db/posts.db'), sqlite.OPEN_READWRITE, (err) => { if (err) return console.error(err.message) });
class messageController {
    async postMessage(req, res) {
        if (req.file) {
            await sharp(req.file.path).resize().jpeg({
                quality: 50
            }).toFile('public/' + req.file.filename);
        }
        const queryObject = url.parse(req.url, true).query;
        const urlange = req.protocol + '://' + req.get('host')
        let messageImg;
        if (req.file) {
            messageImg = urlange + "/public/" + req.file.filename;
        } else {
            messageImg = "";
        }
        let names = `${queryObject.secondName} ${queryObject.name}`
        db.all(`SELECT * from messages WHERE names = '${names}' OR names = '${names.split(' ').reverse().join(' ')}'`, [], (err, rows) => {
            console.log(rows)
            if (rows.length < 1) {
                db.run('INSERT INTO messages (names, last) VALUES  (?,?)', [names, `${queryObject.text}`])
            }
            db.run(`UPDATE messages SET last = '${queryObject.text}' WHERE names = '${names}' OR names = '${names.split(' ').reverse().join(' ')}'`)
            db.run('INSERT INTO messages_info (names, name, text, messageImg, time) VALUES  (?,?,?,?,?)', [names.toString(), `${queryObject.name}`, `${queryObject.text}`, messageImg, new Date().toLocaleTimeString().slice(0, -3)], () => {
                return res.json({ status: 200 })
            })
        })
    }
    async getLinks(req, res) {
        const queryObject = url.parse(req.url, true).query;
        db.all(`SELECT * FROM messages WHERE names LIKE '%${queryObject.name}%'`, [], (err, rows) => {
            for (let i = 0; i < rows.length; i++) {
                db.all(`SELECT * FROM users WHERE name = "${rows[i].names.replace(queryObject.name, '').trim()}"`, [], (err, user) => {
                    rows[i]["backImg"] = user[0].pathImg
                    if (i === rows.length - 1) {
                        return res.json({ data: rows, status: 200 })
                    }
                })

            }

        })
    }
    async getMessages(req, res) {
        const queryObject = url.parse(req.url, true).query;
        db.all(`SELECT * FROM messages_info WHERE names = '${queryObject.names}' OR names = '${queryObject.names.split(' ').reverse().join(' ')}'`, [], (err, rows) => {
            db.all(`SELECT * FROM users WHERE name = "${queryObject.name}"`, [], (err, user) => {
                console.log(user)
                return res.json({
                    status: 200,
                    data: rows,
                    username: user[0].username,
                    pathImg: user[0].pathImg
                })
            })

        })
    }
    async deleteDialog(req, res) {
        const queryObject = url.parse(req.url, true).query;
        db.run(`DELETE FROM messages_info WHERE names = '${queryObject.names}' OR names = '${queryObject.names.split(' ').reverse().join(' ')}'`, [])
        db.run(`DELETE FROM messages WHERE names = '${queryObject.names}' OR names = '${queryObject.names.split(' ').reverse().join(' ')}'`, [])
        return res.json({ status: 200 })
    }
    async deleteMessages(req, res) {
        const queryObject = url.parse(req.url, true).query;
        let id = queryObject.id.split(' ')
        for (let i = 0; i < id.length; i++) {
            db.all(`DELETE FROM messages_info WHERE id = "${id[i]}"`, [], (err, rows) => { console.log(rows) })
        }
        return res.json({ status: 200 })
    }
}
module.exports = new messageController;