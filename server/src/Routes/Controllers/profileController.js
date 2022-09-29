const sqlite = require('sqlite3').verbose();
const path = require('path');
const url = require('url');
const sharp = require('sharp');
const db = new sqlite.Database(path.resolve(__dirname, '../../db/posts.db'), sqlite.OPEN_READWRITE, (err) => { if (err) return console.error(err.message) });
class profileController {
    async setImg(req, res) {
        if (req.file) {
            await sharp(req.file.path).resize().jpeg({
                quality: 50
            }).toFile('public/' + req.file.filename);
        }
        const queryObject = url.parse(req.url, true).query;
        const urlange = req.protocol + '://' + req.get('host')
        db.all(`UPDATE users SET pathimg = "${urlange + '/public/' + req.file.filename}" WHERE name like ${queryObject.name}`, [])
        return res.json({
            data: urlange + '/public/' + req.file.filename,
            status: 200
        })
    }
    async editBackground(req, res) {
        if (req.file) {
            await sharp(req.file.path).resize().jpeg({
                quality: 50
            }).toFile('public/' + req.file.filename);
        }
        const queryObject = url.parse(req.url, true).query;
        const urlange = req.protocol + '://' + req.get('host')
        db.all(`UPDATE users SET backimg = "${urlange + '/public/' + req.file.filename}" WHERE name = "${queryObject.name.toString()}"`, [])
        return res.status(200).json({
            data: urlange + '/public/' + req.file.filename,
            status: 200
        })
    }
    async editUsername(req, res) {
        const queryObject = url.parse(req.url, true).query;
        db.all(`UPDATE users SET username = "${queryObject.username}" WHERE name = "${queryObject.name.toString()}"`, [])
        return res.json({ status: 200 })
    }
    async editInfo(req, res) {
        const queryObject = url.parse(req.url, true).query;
        db.all(`UPDATE users SET info = "${queryObject.text}" WHERE name = "${queryObject.name.toString()}"`, [])
        return res.json({ status: 200 })
    }
    async getUser(req, res) {
        const queryObject = url.parse(req.url, true).query;
        db.all(`SELECT * FROM users WHERE name = "${queryObject.name}" `, [], (err, rows) => {
            return res.json({ "data": rows, status: 200 })
        })
    }
    async getMyUsername(req, res) {
        const queryObject = url.parse(req.url, true).query;
        db.all(`SELECT username FROM users WHERE name = "${queryObject.name}" `, [], (err, rows) => {
            return res.json({ "data": rows, status: 200 })
        })
    }
}
module.exports = new profileController;