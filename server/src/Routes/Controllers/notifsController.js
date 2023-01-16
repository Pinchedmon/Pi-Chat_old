const sqlite = require("sqlite3").verbose();
const path = require("path");
const url = require("url");
const { callbackify } = require("util");
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
                    let sql = ''
                    switch (rows[i].type) {
                        case 1:
                            sql = `SELECT text, postimg as img FROM posts WHERE ID = ${rows[i].object}`
                        case 2:
                            sql = `SELECT text, commentimg as img from comments WHERE ID = ${rows[i].object}`
                        case 4:
                            sql = `SELECT text, commentimg as img from comments WHERE ID = ${rows[i].object}`
                    }

                    db.get(sql, (err, data) => {
                        if (data !== undefined) {
                            console.log(data)
                            rows[i]["objectImg"] = data.img
                            rows[i]["objectText"] = data.text
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
        const queryObject = url.parse(req.url, true).query;

    }

}
module.exports = new notifsController();