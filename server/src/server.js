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
    const { author, text, course, category, comments, likes, date } = req.body;
    sql = "INSERT INTO posts (author, text, course, category, comments, likes) VALUES (?, ?, ?, ?, ?, ?)"
    db.all(sql, [author, text, course, category, comments, likes, date], (err) => {
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


app.get('/feed', (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  sql = `SELECT * FROM posts WHERE category = "${queryObject.category}" and course = "${queryObject.sort}" `
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    })
  });
})
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
app.delete('/api/sessions', (req, res) => {
  sql = `DELETE FROM session`
  db.run(sql, (err) => {
    if (err) return console.error(err.message)
  })
  return res.json({
    status: 200,
    succes: true
  })
})
app.listen(port)