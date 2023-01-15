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
        db.all(`SELECT * FROM follows WHERE name = "${queryObject.name}" and object = "${queryObject.object}" `, [], (err, rows) => {
            db.run(`INSERT INTO follows (name, object) VALUES ( ?,? )`, [queryObject.name, queryObject.object])
            db.all(`SELECT ID from follows where name = "${queryObject.name}" and object = "${queryObject.object}"`, [], (err, check) => {
                db.run("INSERT INTO notifications (senderName, receiverName, type, object, date) values (?, ?, ?, ?, ?)", [
                    queryObject.name,
                    queryObject.object,
                    3,
                    check[0].ID,
                    new Date().toUTCString()
                ])
            })
            return res.json({ status: 200 })
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
        db.all(`SELECT ID from follows where name = '${queryObject.name}' AND object = '${queryObject.object}'`, [], (err, follow) => {
            console.log(follow)
            if (follow.length > 0) {
                db.run(`DELETE FROM notifications WHERE senderName = "${queryObject.name}" and type = "3" and object = ${follow[0].ID}`)
            }
        })
        db.run(`DELETE FROM follows WHERE name = '${queryObject.name}' AND object = '${queryObject.object}'`)


        return res.json({ status: 200 })
    }
}
module.exports = new followController();