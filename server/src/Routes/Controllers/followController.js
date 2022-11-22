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
        db.all(`SELECT * FROM follows WHERE name = '${queryObject.name}' and object = '${queryObject.object}' `, [], (err, rows) => {
            if (rows.length >= 1) {
                return res.json({ status: 201 })
            } else {
                db.run(sql, [queryObject.name, queryObject.object])
                return res.json({ status: 200 })
            }
        })

    }
    async getSubscribes(req, res) {

        const queryObject = url.parse(req.url, true).query;
        db.all(`SELECT * FROM follows WHERE name = "${queryObject.name}"`, [], (err, follows) => {
            for (let i = 0; i < follows.length; i++) {
                db.all(`SELECT * FROM users WHERE name = "${follows[i].object}"`, [], (err, user) => {
                    follows[i]["img"] = user[0].pathImg
                })
            }
            db.all(`SELECT * FROM follows WHERE object = "${queryObject.name}"`, [], (err, followers) => {
                for (let j = 0; j < followers.length; j++) {
                    db.all(`SELECT * FROM users WHERE name = "${followers[j].name}"`, [], (err, user) => {
                        followers[j]["img"] = user[0].pathImg
                        if (j === followers.length - 1) {
                            return res.json({ status: 200, data: { followers, follows } })
                        }
                    })
                }
            });
        });


    }
    async deleteFollow(req, res) {
        const queryObject = url.parse(req.url, true).query;
        sql = `DELETE FROM follows WHERE name = '${queryObject.name}' AND object = '${queryObject.object}'`;
        db.run(sql)
        return res.json({ status: 200 })
    }
}
module.exports = new followController();