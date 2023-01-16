const sqlite = require("sqlite3").verbose();
const path = require("path");
const url = require("url");
const fs = require("fs");
const sharp = require('sharp');
const db = new sqlite.Database(
    path.resolve(__dirname, "../../db/posts.db"),
    sqlite.OPEN_READWRITE,
    (err) => {
        if (err) return console.error(err.message);
    }
);
let sql;

class commentController {
    async commentUpload(req, res) {
        if (req.file) {
            await sharp(req.file.path).resize().jpeg({
                quality: 50
            }).toFile('public/' + req.file.filename);
        }
        const queryObject = url.parse(req.url, true).query;
        const urlange = req.protocol + "://" + req.get("host");
        sql =
            "INSERT INTO comments (commentId, postId, name, text, commentImg, date) VALUES (?, ?, ?, ?, ?, ?)";
        let commentImg;
        if (req.file) {
            commentImg = urlange + "/public/" + req.file.filename;
        } else {
            commentImg = "";
        }
        db.all(
            sql,
            [
                queryObject.commentId,
                queryObject.id,
                queryObject.name,
                queryObject.text,
                commentImg,
                queryObject.date,
            ], (err) => {
                if (err) return res.json({ status: 404, success: false, error: err });
            }
        );
        if (queryObject.commentId !== 'undefined') {
            db.all(`SELECT ID from comments WHERE date = "${queryObject.date}"`, (err, id) => {
                db.all(`SELECT name from posts WHERE ID = ${queryObject.id}`, (err, postName) => {
                    if (queryObject.profileName !== postName[0].name) {
                        db.run("INSERT INTO notifications (senderName, receiverName, type, object, date) values (?, ?, ?, ?, ?)", [
                            queryObject.name,
                            postName[0].name,
                            4,
                            id[0].ID,
                            new Date().toUTCString()
                        ])
                    }
                })
            })

        }
        db.all(
            `SELECT * FROM comments WHERE postId = ${queryObject.id}`,
            [],
            (err, rows) => {

                db.all(
                    `UPDATE posts set comments = ${rows.length} WHERE ID = ${queryObject.id}`
                );
            }
        );
        return res.json({
            status: 200,
            success: true,
        });
    }
    async likeComment(req, res) {
        const queryObject = url.parse(req.url, true).query;
        db.all(
            `SELECT * FROM likes WHERE name = "${queryObject.profileName
            }" AND commentId = "${Number(queryObject.ID)}"`,
            [],
            (err, rows) => {
                if (rows.length === 0) {
                    db.all("INSERT INTO likes (name, commentId) values (? , ?)", [
                        queryObject.profileName,
                        queryObject.ID,
                    ]);
                    db.all(`SELECT COUNT(commentId) FROM likes WHERE commentId = "${queryObject.ID}"`, [], (err, likes) => {
                        db.run(
                            `UPDATE comments SET likes = ${likes[0]['COUNT(commentId)']}  WHERE ID = ${queryObject.ID}`
                        );
                        db.all(`SELECT name from comments WHERE id = "${queryObject.ID}"`, [], (err, name) => {
                            if (name.length > 0) {
                                if (queryObject.profileName !== name[0].name) {
                                    db.run("INSERT INTO notifications (senderName, receiverName, type, object, date) values (?, ?, ?, ?, ?)", [
                                        queryObject.profileName,
                                        name[0].name,
                                        2,
                                        queryObject.ID,
                                        new Date().toUTCString()
                                    ])
                                }
                            }
                        })
                        return res.json({ status: 200, likes: likes[0]['COUNT(commentId)'] });

                    })
                } else {
                    db.run(
                        `DELETE FROM likes WHERE name = "${queryObject.profileName}" and commentId = "${queryObject.ID}"`
                    );
                    db.run(`DELETE FROM notifications WHERE senderName = "${queryObject.profileName}" and type = "2" and object = "${queryObject.ID}"`)
                    db.all(`SELECT COUNT(commentId) FROM likes WHERE commentId = "${queryObject.ID}"`, [], (err, likes) => {
                        db.run(
                            `UPDATE comments SET likes = ${likes[0]['COUNT(commentId)']}  WHERE ID = ${queryObject.ID}`
                        );

                        return res.json({ status: 200, likes: likes[0]['COUNT(commentId)'] });
                    })
                }
            })
    }
    async deleteComment(req, res) {
        const queryObject = url.parse(req.url, true).query;
        db.all(`SELECT commentImg, commentId FROM comments WHERE ID = ${queryObject.id}`, [], (err, comment) => {
            if (comment.length > 0) {
                if (comment[0].commentImg !== '') {
                    fs.unlinkSync(path.resolve(__dirname, `../../../public/${img[0].commentImg.slice(28, img[0].commentImg.length)}`))
                    fs.unlinkSync(path.resolve(__dirname, `../../../public/original/${img[0].commentImg.slice(28, img[0].commentImg.length)}`))
                }
                if (comment[0].commentId !== '') {
                    db.all(`DELETE FROM notifications WHERE type = "4" and object = ${queryObject.id} `)
                }
            }
        })
        sql = `DELETE FROM comments WHERE id = ${queryObject.id}`;
        db.run(sql, (err) => {
            if (err) return console.error(err.message);
        });
        db.run(
            `DELETE FROM likes WHERE commentId = '${queryObject.id}'`
        );
        db.all(
            `SELECT * FROM comments WHERE postId = ${queryObject.postId}`,
            [],
            (err, rows) => {
                db.all(
                    `UPDATE posts set comments = ${rows.length} WHERE ID = ${queryObject.postId}`
                );
                return res.json({ status: 200 });
            }
        );

    }
}
module.exports = new commentController();