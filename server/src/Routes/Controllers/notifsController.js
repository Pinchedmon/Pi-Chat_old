const sqlite = require("sqlite3").verbose();
const path = require("path");
const url = require("url");
const db = new sqlite.Database(
    path.resolve(__dirname, "../../db/posts.db"),
    sqlite.OPEN_READWRITE,
    (err) => {
        if (err) return console.error(err.message);
    }
);
class notifsController {
    async getNotifs(req, res) {
        const queryObject = url.parse(req.url, true).query;
        db.all(`SELECT * FROM notifications WHERE receiverName = "${queryObject.name}"`, [], (err, rows) => {
            let x = 0;
            for (let i = 0; i < rows.length; i++) {
                db.all(`SELECT USERNAME, pathimg FROM users WHERE name = "${rows[i].senderName}"`, [], (err, user) => {
                    rows[i]['username'] = user[0].username
                    rows[i]['pathImg'] = user[0].pathImg
                    db.all(`SELECT text, ${rows[i].type !== 1 ? 'commentImg' : 'postImg'} as img FROM ${rows[i].type !== 1 ? 'comments' : 'posts'} WHERE ID = ${rows[i].object}`, [], (err, data) => {
                        if (data[0] !== undefined) {
                            rows[i]["objectImg"] = data[0].img
                            rows[i]["objectText"] = data[0].text
                        }
                        x++
                        if (x === rows.length) {
                            return res.json({ status: 200, data: rows.reverse(), })
                        }
                    })
                })
            }
        })
    }
    async readNotif(req, res) {
        let notify = JSON.parse(req.body.notify)
        let x = 0;
        for (let i = 0; i < notify.length; i++) {
            db.run(`UPDATE notifications set read = true WHERE receiverName = "${notify[i].receiverName}" and senderName = "${notify[i].senderName}" and type = "${notify[i].type}" or type = ${notify[0].type} and object = "${notify[i].object}"`)
            x++
        }
        if (x === notify.length) {
            return res.json({ status: 200 })
        }
    }
}
module.exports = new notifsController();