const sqlite = require("sqlite3")
const path = require("path");
const url = require("url");
const sharp = require('sharp');
const paginate = require("jw-paginate");
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
      "INSERT INTO posts (name, text, course, category, postImg, date) VALUES ( ?, ?, ?, ?, ?, ?)";
    db.all(
      sql,
      [
        queryObject.name,
        queryObject.text,
        queryObject.course,
        queryObject.category,
        postImg,
        queryObject.time
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
    db.all(`SELECT * FROM posts WHERE category = "${queryObject.category}"${queryObject.sort === 'Late' ? ' ' : ` and course = ${queryObject.sort}`} ORDER BY id DESC`, [], async (err, rows) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      if (rows.length === 0) {
        return res.json({
          data: [],
          status: 200
        });
      }
      const page = parseInt(queryObject.page) || 1;
      const pager = paginate(rows.length, page, queryObject.count);
      const pageOfItems = rows.slice(pager.startIndex, pager.endIndex + 1);
      if (page > pager.totalPages) {
        return res.json({ data: [], status: 200 });
      }

      let x = 0;
      for (let i = 0; i < pageOfItems.length; i++) {
        await db.all(`SELECT USERNAME, pathimg FROM users WHERE name = "${pageOfItems[i].name}"`, [], (err, user) => {
          pageOfItems[i]['username'] = user[0].username
          pageOfItems[i]['pathImg'] = user[0].pathImg
          x++;
          if (x === pageOfItems.length) {
            return res.json({ data: pageOfItems, page: Number(page) + 1, status: 200 });
          }
        })
      }
    });
  }
  async getMyPosts(req, res) {
    const queryObject = url.parse(req.url, true).query;
    sql = `SELECT * FROM posts WHERE name = "${queryObject.name}" ORDER BY date DESC`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      const page = parseInt(queryObject.page) || 1;
      const pager = paginate(rows.length, page);
      const pageOfItems = rows.slice(pager.startIndex, pager.endIndex + 1);
      let x = 0;
      for (let i = 0; i < pageOfItems.length; i++) {
        db.all(`SELECT USERNAME, pathimg FROM users WHERE name = "${pageOfItems[i].name}"`, [], (err, user) => {
          pageOfItems[i]['username'] = user[0].username
          pageOfItems[i]['pathImg'] = user[0].pathImg
          x++;
          if (x === pageOfItems.length) {
            return res.json({ pager, data: pageOfItems, status: 200 });
          }
        })
      }
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
    db.all(`SELECT * FROM posts WHERE id = "${queryObject.id}"`, [], (err, post) => {
      db.all(`SELECT * FROM users WHERE name = "${post[0].name}"`, [], (err, user) => {
        post[0]["username"] = user[0].username;
        post[0]["pathImg"] = user[0].pathImg;
      })

      let x = 0;
      db.all(`SELECT * FROM comments WHERE postId = ${queryObject.id} ORDER BY id DESC`, [], (err, comments) => {
        if (comments.length === 0) {
          return res.json({
            data: { post, comments: [] },
            status: 200
          });
        }
        const page = parseInt(queryObject.page) || 1;
        const pager = paginate(comments.length, page, queryObject.count);
        const pageOfItems = comments.slice(pager.startIndex, pager.endIndex + 1);
        for (let i = 0; i < pageOfItems.length; i++) {
          db.all(`SELECT * FROM users WHERE name = "${pageOfItems[i].name}"`, [], (err, user) => {
            pageOfItems[i]['username'] = user[0].username;
            pageOfItems[i]['img'] = user[0].pathImg;
            x++;
            if (x === pageOfItems.length) {

              return res.json({
                data: { post, comments: pageOfItems },
                continue: pager.currentPage < pager.totalPages,
                status: 200
              });
            }
          })
        }
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
