const sqlite = require('sqlite3').verbose();
const path = require('path');
const url = require('url');
const db = new sqlite.Database(path.resolve(__dirname, '../../db/posts.db'), sqlite.OPEN_READWRITE, (err) => { if (err) return console.error(err.message) });
class profileController {
    async setImg(req, res) {
        const queryObject = url.parse(req.url, true).query;
        const urlange = req.protocol + '://' + req.get('host')
        db.all(`UPDATE users SET pathimg = "${urlange + '/public/' + req.file.filename}" WHERE name like ${queryObject.name}`, [])
        db.all(`UPDATE posts SET userImg = "${urlange + '/public/' + req.file.filename}" WHERE author = ${queryObject.name}`, [])
        db.all(`UPDATE comments SET userImg = "${urlange + '/public/' + req.file.filename}" WHERE author = ${queryObject.name}`, [])
        return res.status(200).json({
            data: urlange + '/public/' + req.file.filename
        })
    }
    async editBackground(req, res) {
        const queryObject = url.parse(req.url, true).query;
        const urlange = req.protocol + '://' + req.get('host')
        db.all(`UPDATE users SET backimg = "${urlange + '/public/' + req.file.filename}" WHERE name = "${queryObject.name.toString()}"`, [])
        return res.status(200).json({
            data: urlange + '/public/' + req.file.filename
        })
    }
    async editUsername(req, res) {
        const queryObject = url.parse(req.url, true).query;
        db.all(`UPDATE users SET username = "${queryObject.username}" WHERE name = "${queryObject.name.toString()}"`, [])
        db.all(`UPDATE posts SET username = "${queryObject.username}" WHERE author = "${queryObject.name.toString()}"`,[])
        db.all(`UPDATE comments SET username = "${queryObject.username}" WHERE author = "${queryObject.name.toString()}"`,[])
        return res.status(200)
    }
}
module.exports = new profileController;