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
            return res.json({ status: 200, data: rows })
        })
    }
    async readNotif(req, res) {
        const queryObject = url.parse(req.url, true).query;

    }

}
module.exports = new notifsController();