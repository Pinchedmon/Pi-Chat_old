const express = require('express'),
  app = express(),
  fs = require('fs'),
  cors = require('cors'),
  path = require('path'),
  sqlite = require('sqlite3').verbose(),
  url = require('url');

const db = new sqlite.Database(path.resolve(__dirname, './db/posts.db'), sqlite.OPEN_READRIGHT, (err) => { if (err) return console.error(err.message) });

const port = 6060;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// post request

app.post('/feed', (req, res) => {
  try {
    const { author, text, likes, comments, date } = req.body;
    sql = "INSERT INTO posts (author, text, likes, comments, date) VALUES (?, ?, ?, ?, ?)"
    db.run(sql, [author, text, likes, comments, date], (err) => {
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

// get request 

app.get('/feed', (req, res) => {
  sql = "DELETE FROM posts WHERE author IS NULL;"
  db.run(sql, (err) => {
    if (err) return console.error(err.message)
  })
  sql = "SELECT * FROM posts";

  try {
    const queryObject = url.parse(req.url, true).query;
    if (queryObject.field && queryObject.type)
      sql += ` WHERE ${queryObject.field} LIKE '%${queryObject.type}%'`
    db.all(sql, [], (err, rows) => {
      if (err) {
        return res.json({ status: 300, success: false, error: err })
      }
      if (rows.length) { if (err) return res.json({ status: 300, success: false, error: 'No match' }) }
      return res.json({ status: 200, data: rows, success: true })
    })
  } catch (error) {
    return res.json({
      status: 400,
      success: false
    }
    )
  }
})
app.delete('/feed', (req, res) => {
  try {
    sql = "DELETE FROM posts WHERE   ID = (SELECT MAX(ID)  FROM posts );"
    db.run(sql, (err) => {
      if (err) return console.error(err.message)
    })
    return res.json({
      status: 200,
      succes: true
    })
  } catch (error) {
    return res.json({
      status: 400,
      success: false
    }
    )
  }
}

)
app.listen(port)

