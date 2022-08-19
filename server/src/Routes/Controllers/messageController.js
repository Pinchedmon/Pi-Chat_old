const sqlite = require('sqlite3').verbose();
const path = require('path');
const { Database } = require('sqlite3');
const url = require('url');
const db = new sqlite.Database(path.resolve(__dirname, '../../db/posts.db'), sqlite.OPEN_READWRITE, (err) => { if (err) return console.error(err.message) });
class messageController {
    async postMessage(req, res) {
        const queryObject = url.parse(req.url, true).query;
        const urlange = req.protocol + '://' + req.get('host')
        let messageImg;
        if (req.file) {
            messageImg = urlange + "/public/" + req.file.filename;
        } else {
            messageImg = "";
        }
        db.all(`SELECT * from messages WHERE names = ${queryObject.secondName} ${queryObject.name} OR names = ${queryObject.name} ${queryObject.secondName}`, [], (err, rows) => {
            console.log(rows)
            if (rows === undefined || rows === []) {
                db.run('INSERT INTO messages (names, last) VALUES  (?,?)', [queryObject.name + ' ' + queryObject.secondName, `${queryObject.text}`])
            }
            db.run(`UPDATE messages SET last = ${queryObject.text}`)
            db.all('INSERT INTO messages_info (name,username, text, userImg, messageImg) VALUES  (?,?,?,?,?)', [`${queryObject.name} ${queryObject.secondName}`, `${queryObject.name}`, queryObject.text, queryObject.userImg, messageImg])
            return res.status(200)
        })
    }
    async getLinks(req, res) {
        const queryObject = url.parse(req.url, true).query;
        db.all(`SELECT * FROM messages WHERE names LIKE '%${queryObject.name}%'`, [], (err, rows) => {
            return res.status(200).json({ data: rows })
        })
    }
    async getMessages(req, res) {
        const queryObject = url.parse(req.url, true).query;
        db.all(`SELECT * FROM messages_info WHERE name = '${queryObject.names}'`, [], (err, rows) => {

            return res.status(200).json({ data: rows })
        })
    }
}
module.exports = new messageController;