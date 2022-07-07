const express = require('express'),
  app = express(),
  fs = require('fs'),
  cors = require('cors'),
  path = require('path'),
  sqlite = require('sqlite3').verbose(),
  url = require('url');

const db = new sqlite.Database(path.resolve(__dirname, './db/posts.db'), sqlite.OPEN_READWRITE, (err) => { if (err) return console.error(err.message) });
const port = 6060;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// post request
app.post('/comments', (req, res) => {
  try {
    // const {id, author, text, likes} = req.body;
    sql = "INSERT INTO comments (author, text, likes) VALUES (?, ?, ?)";
    db.run(sql, ['text', 'text', 2], (err) => {
      if (err) return res.json({ status: 300, success: false, error: err })
    })
    return res.json({
      status:  200,
      success: true
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false
    });
  }
})
app.post('/feed', (req, res) => {
  try {
    const { author, text, course, category, comments, likes, date } = req.body;
    sql = "INSERT INTO posts (author, text, course, category, comments, likes) VALUES (?, ?, ?, ?, ?, ?)"
    db.run(sql, [author, text, course, category, comments, likes, date], (err) => {
      if (err) return res.json({ status: 300, success: false, error: err })
    })
    return res.json({
      status:  200,
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
app.get('/comments', (req, res) => {
  try {
    sql = "SELECT * FROM comments"
    const queryObject = url.parse(req.url, true).query;
    if (queryObject.field && queryObject.type){
      sql += `WHERE ${queryObject.field} LIKE '%${queryObject.type}%'`
    }
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
app.get('/feed', (req, res) => {
  try {
    const queryObject = url.parse(req.url, true).query;
    sql = `SELECT * FROM posts WHERE category = "${queryObject.category}" and course = "${queryObject.sort}" `
    console.log(queryObject)
    console.log(sql)
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
    const queryObject = url.parse(req.url, true).query;
    sql = `DELETE FROM posts WHERE ID = ${queryObject.id}`
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

