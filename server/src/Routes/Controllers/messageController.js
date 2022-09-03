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
        let names = `${queryObject.secondName} ${queryObject.name}`
        db.all(`SELECT * from messages WHERE names = '${names}' OR names = '${names.split(' ').reverse().join(' ')}'`, [], (err, rows) => {
            console.log(rows)
            if (rows.length < 1) {
                db.run('INSERT INTO messages (names, last) VALUES  (?,?)', [names, `${queryObject.text}`])
            }
            db.run(`UPDATE messages SET last = '${queryObject.text}' WHERE names = '${names}' OR names = '${names.split(' ').reverse().join(' ')}'`)
            db.run('INSERT INTO messages_info (name,username, text, messageImg) VALUES  (?,?,?,?)', [names.toString(), `${queryObject.name}`, `${queryObject.text}`, messageImg], () => {
                return res.json({ status: 200 })
            })
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
        db.all(`SELECT * FROM messages_info WHERE name = '${queryObject.names}' OR name = '${queryObject.names.split(' ').reverse().join(' ')}'`, [], (err, rows) => {
            return res.status(200).json({
                data: rows,
                answer: queryObject.names.split(' ').reverse().join(' ')
            })
        })
    }
    async deleteDialog(req, res) {
        const queryObject = url.parse(req.url, true).query;
        db.run(`DELETE FROM messages_info WHERE name = '${queryObject.names}' OR name = '${queryObject.names.split(' ').reverse().join(' ')}'`, [])
        db.run(`DELETE FROM messages WHERE names = '${queryObject.names}' OR names = '${queryObject.names.split(' ').reverse().join(' ')}'`, [])
        return res.json({ status: 200 })
    }
}
module.exports = new messageController;