const sqlite = require('sqlite3').verbose();
const path = require('path');
const url = require('url');
const db = new sqlite.Database(path.resolve(__dirname, '../../db/posts.db'), sqlite.OPEN_READWRITE, (err) => { if (err) return console.error(err.message) });
let sql;


class postController {

    async postUpload(req, res) {
        const queryObject = url.parse(req.url, true).query;
        const urlange = req.protocol + '://' + req.get('host')
        let postImg
        if (req.file) {
            postImg = urlange + '/public/' + req.file.filename;
        } else {
            postImg = ''
        }
        sql = "INSERT INTO posts (author, text, course, category, userImg, postImg) VALUES (?, ?, ?, ?, ?, ?)"
        db.all(sql, [queryObject.author, queryObject.text, queryObject.course, queryObject.category, queryObject.userImg, postImg], (err) => {
            if (err) return res.json({ status: 300, success: false, error: err })
        })
        return res.json({
            status: 200,
            success: true
        });

    }
    async commentUpload(req, res) {
        const queryObject = url.parse(req.url, true).query;
        const urlange = req.protocol + '://' + req.get('host')
        sql = "INSERT INTO comments (id, author, text, userImg, commentImg) VALUES (?, ?, ?, ?, ?)"
        let commentImg
        if (req.file) {
            commentImg = urlange + '/public/' + req.file.filename;
        } else {
            commentImg = ''
        }
        db.all(sql, [queryObject.id, queryObject.author, queryObject.text, queryObject.userImg, commentImg], (err) => {
            if (err) return res.json({ status: 300, success: false, error: err })
        })
        return res.json({
            status: 200,
            success: true
        });
    }
    async getFeed(req, res) {
        const queryObject = url.parse(req.url, true).query;
        if (queryObject.sort !== 'Late') {
            sql = `SELECT * FROM posts WHERE category = "${queryObject.category}" and course = "${queryObject.sort}" `
        } else {
            sql = `SELECT * FROM posts WHERE category = "${queryObject.category}"`
        }
        db.all(sql, [], (err, rows) => {
            if (err) {
                return res.status(400).json({ "error": err.message });
            }
            return res.json({
                "message": "success",
                "data": rows.reverse(),
            })
        })
    }
    async likePost(req, res) {
        const queryObject = url.parse(req.url, true).query;
        db.all(`UPDATE posts SET likes = ${queryObject.likes} WHERE ID = ${queryObject.id}`)
    }
    async getPost(req, res) {
        const queryObject = url.parse(req.url, true).query;
        sql = `SELECT * FROM posts WHERE id = "${queryObject.id}"`
        db.all(sql, [], (err, rows) => {
            let post = rows
            let image;
            db.all(`SELECT * from users WHERE name LIKE "${post[0].author}";`, [], (err, rows) => {
                image = rows[0].pathImg
            })
            sql = `SELECT * FROM comments WHERE id = ${queryObject.id}`
            db.all(sql, [], (err, rows) => {
                return res.status(200).json({
                    "post": post,
                    comments: rows,
                    "image": image

                })
            })
        })
    }
    async likeComment(req, res) {
        const queryObject = url.parse(req.url, true).query;
        db.all(`UPDATE comments SET likes = ${queryObject.likes} WHERE ID = ${queryObject.id}`)
    }
    async comments(req, res) {
        const queryObject = url.parse(req.url, true).query;
        db.all(`UPDATE posts SET comments = ${queryObject.comments} WHERE ID = ${queryObject.id}`)
    }
    async deletePost(req, res) {
        const queryObject = url.parse(req.url, true).query;
        sql = `DELETE FROM posts WHERE ID = ${queryObject.id}`
        db.run(sql, (err) => {
            if (err) return console.error(err.message)
        })
        db.run(`DELETE FROM comments WHERE ID = ${queryObject.id}`)
        return res.json({
            status: 200,
            succes: true
        })
    }
    async deleteComment(req, res) {
        const queryObject = url.parse(req.url, true).query;
        sql = `DELETE FROM comments WHERE text = "${queryObject.text}"`
        db.run(sql, (err) => {
            if (err) return console.error(err.message)
        })
        db.run(`UPDATE posts SET comments = comments - 1 WHERE ID = ${queryObject.id}`)
    }
}
module.exports = new postController