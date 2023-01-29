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
class searchController {
    async getPosts(req, res) {
        const queryObject = url.parse(req.url, true).query;
        db.all(`SELECT * FROM posts WHERE category = "${queryObject.category}"${queryObject.course === 'Late' ? ' ' : ` and course = "${queryObject.course}" `}${queryObject.query !== '' ? `and text Like "%${queryObject.query}%"` : ''} ORDER BY id DESC`, [], (err, rows) => {
            if (rows !== undefined) {
                if (rows.length > 0) {
                    let x = 0;
                    for (let i = 0; i < rows.length; i++) {
                        db.all(`SELECT USERNAME, pathimg FROM users WHERE name = "${rows[i].name}"`, [], (err, user) => {
                            rows[i]['username'] = user[0].username
                            rows[i]['pathImg'] = user[0].pathImg
                            x++
                            if (x === rows.length) {
                                return res.json({ status: 200, data: rows.reverse(), })
                            }
                        })
                    }
                }
            }
            else {
                return res.json({ status: 200, data: [] })
            }

        })
    }
    async getUsers(req, res) {
        const queryObject = url.parse(req.url, true).query;
        db.all(`SELECT * FROM users ${queryObject.query !== '' ? `WHERE name like "%${queryObject.query}%"` : ''}`, [], (err, rows) => {
            return res.json({ status: 200, data: rows })
        })
    }
}
module.exports = new searchController();