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
let sql;

class followController {
    async follow(req, res) {
        const queryObject = url.parse(req.url, true).query;
        sql = `INSERT INTO follows (name, object) VALUES ( ?,? )`;
        db.run(sql, [queryObject.name, queryObject.object], (err) => {
            if (err) return console.error(err.message);
        });
        return res.json({ status: 200 })
    }
    async getFollows(req, res) {
        const queryObject = url.parse(req.url, true).query;
        sql = `SELECT * FROM follows WHERE name = "${queryObject.name}" `;
        db.all(sql, [], (err, rows) => {
            if (err) return console.error(err.message);
            return res.json({ status: 200, data: rows })
        });

    }
    async getFollowers(req, res) {
        const queryObject = url.parse(req.url, true).query;
        sql = `SELECT * FROM follows WHERE object = ${queryObject.object} `;
        db.all(sql, [], (err, rows) => {
            if (err) return console.error(err.message);
            return res.json({ status: 200, data: rows })
        });

    }

    async deleteFollow(req, res) {
        const queryObject = url.parse(req.url, true).query;
        sql = `DELETE FROM follows WHERE id = ${queryObject.id}`;
        db.run(sql, (err) => {
            if (err) return console.error(err.message);
        });
        return res.json({ status: 200 })

    }
}
module.exports = new followController();