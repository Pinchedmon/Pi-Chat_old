const express = require('express'),
  app = express(),
  fs = require('fs'),
  cors = require('cors'),
  path = require('path'),
  sqlite = require('sqlite3').verbose(),
  url = require('url'),
  authRouter = require('./authRouter');
const bcrypt = require('bcryptjs')

const db = new sqlite.Database(path.resolve(__dirname, './db/posts.db'), sqlite.OPEN_READWRITE, (err) => { if (err) return console.error(err.message) });
const port = 6060;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/auth', authRouter)

app.post('/feed', (req, res) => {
  try {
    const { author, text, course, category } = req.body;
    sql = "INSERT INTO posts (author, text, course, category) VALUES (?, ?, ?, ?)"
    db.all(sql, [author, text, course, category], (err) => {
      if (err) return res.json({ status: 300, success: false, error: err })
    })
    return res.json({
      status: 200,
      success: true
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false
    });
  }
})
app.post('/feed/comments', (req, res) => {
  const { comment } = req.body;
  sql = "INSERT INTO comments (id, author, text) VALUES (?, ?, ?)"
  db.all(sql, [comment.id, comment.author, comment.text], (err) => {
    if (err) return res.json({ status: 300, success: false, error: err })
  })
  return res.json({
    status: 200,
    success: true
  });

})
app.get('/feed', (req, res) => {
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
      "data": rows.reverse()
    })
  });
})
app.get('/post', (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  db.all(`UPDATE posts SET likes=${queryObject.likes} WHERE ID=${queryObject.id}`, [], (err) => {
    if (err) return console.error(err.message)
  })
  sql = `SELECT * FROM posts WHERE id = ${queryObject.id}`
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ "error": err.message });
    }
    let post = rows
    sql = `SELECT * FROM comments WHERE id = ${queryObject.id}`
    db.all(sql, [], (err, rows) => {
      if (err) {
        return res.status(400).json({ "error": err.message });
      }
      return res.status(200).json({
        "post": post,
        "comments": rows
      })
    })
  })
})
app.put('/feed', function (req, res) {
  const queryObject = url.parse(req.url, true).query;
  db.all(`UPDATE posts SET likes=${queryObject.likes} WHERE ID=${queryObject.id}`, [], (err) => {
    if (err) return console.error(err.message)
  })
});
app.put('/post', function (req, res) {
  const queryObject = url.parse(req.url, true).query;
  db.all(`UPDATE posts SET comments=${queryObject.comments} WHERE ID=${queryObject.id}`, [], (err) => {
    if (err) return console.error(err.message)
  })
});
app.delete('/feed', (req, res) => {

  const queryObject = url.parse(req.url, true).query;
  sql = `DELETE FROM posts WHERE ID = ${queryObject.id}`
  db.run(sql, (err) => {
    if (err) return console.error(err.message)
  })
  return res.json({
    status: 200,
    succes: true
  })
})

app.listen(port)