const sqlite = require("sqlite3").verbose();
const path = require("path");
const url = require("url");
const sharp = require('sharp');
const db = new sqlite.Database(
  path.resolve(__dirname, "../../db/posts.db"),
  sqlite.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
  }
);
let sql;

class postController {
  async postUpload(req, res) {
    if (req.file) {
      await sharp(req.file.path).resize().jpeg({
        quality: 50
      }).toFile('public/' + req.file.filename);
    }
    const queryObject = url.parse(req.url, true).query;
    const urlange = req.protocol + "://" + req.get("host");
    let postImg;

    if (req.file) {
      postImg = urlange + "/public/" + req.file.filename;
    } else {
      postImg = "";
    }
    sql =
      "INSERT INTO posts (name, text, course, category, postImg, date, time) VALUES ( ?, ?, ?, ?, ?, ?, ?)";
    db.all(
      sql,
      [
        queryObject.name,
        queryObject.text,
        queryObject.course,
        queryObject.category,
        postImg,
        new Date().toLocaleDateString(),
        new Date().toLocaleTimeString().slice(0, -3)
      ],
      (err) => {
        if (err) return res.json({ status: 300, success: false, error: err });
      }
    );
    return res.json({
      status: 200,
      success: true,
    });
  }

  async getFeed(req, res) {
    const queryObject = url.parse(req.url, true).query;
    db.all(`SELECT * FROM posts WHERE category = "${queryObject.category}" ${queryObject.sort !== "Late" ? `'and course = "${queryObject.sort}'` : ''}`, [], (err, rows) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      for (let i = 0; i < rows.length; i++) {
        db.all(`SELECT * FROM users WHERE name = "${rows[i].name}"`, [], (err, user) => {
          rows[i]["username"] = user[0].username
          rows[i]["pathImg"] = user[0].pathImg
          if (i === rows.length - 1) {
            return res.json({
              message: "success",
              data: rows
            });
          }
        })
      }
    });
  }
  async getMyPosts(req, res) {
    const queryObject = url.parse(req.url, true).query;
    sql = `SELECT * FROM posts WHERE name = "${queryObject.name}"`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      return res.json({
        status: 200,
        data: rows,
      });
    });
  }
  async likePost(req, res) {
    const queryObject = url.parse(req.url, true).query;
    db.all(
      `SELECT * FROM likes WHERE name = "${queryObject.profileName
      }" AND postId = "${Number(queryObject.postId)}"`,
      [],
      (err, rows) => {
        if (rows.length === 0) {
          db.all(
            `UPDATE posts SET likes = likes + 1  WHERE ID = ${queryObject.postId}`
          );
          db.all("INSERT INTO likes (name, postID) values (? , ?)", [
            queryObject.profileName,
            queryObject.postId,
          ]);
        } else {
          db.all(
            `UPDATE posts SET likes = likes - 1  WHERE ID = ${queryObject.postId}`
          );
          db.all(
            `DELETE FROM likes WHERE name = "${queryObject.profileName}" and postId = "${queryObject.postId}"`
          );
        }
      }
    );
    return res.json({ status: 200 });
  }
  async getPost(req, res) {
    const queryObject = url.parse(req.url, true).query;
    sql = `SELECT * FROM posts WHERE id = "${queryObject.id}"`;
    db.all(sql, [], (err, rows) => {
      let post = rows;
      sql = `SELECT * FROM comments WHERE postId = ${queryObject.id}`;
      db.all(sql, [], (err, rows) => {
        return res.status(200).json({
          post: post,
          comments: rows
        });
      });
    });
  }

  async deletePost(req, res) {
    const queryObject = url.parse(req.url, true).query;
    sql = `DELETE FROM posts WHERE ID = ${queryObject.id}`;
    db.run(sql, (err) => {
      if (err) return console.error(err.message);
    });
    db.run(`DELETE FROM comments WHERE postId = ${queryObject.id}`);
    db.run(
      `DELETE FROM likes WHERE postId = '${queryObject.id}'`
    );
    return res.json({
      status: 200,
      succes: true,
    });
  }
}
module.exports = new postController();
