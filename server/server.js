const express = require('express'),
  app = express(),
  fs = require('fs'),
  cors = require('cors'),
  path = require('path'),
  sqlite = require('sqlite3').verbose(),
  url = require('url'),
  authRouter = require('./src/Routes/authRouter'),
  postRouter = require('./src/Routes/postRouter'),
  profileRouter = require('./src/Routes/profileRouter'),
  messageRouter = require('./src/Routes/messageRouter');

const db = new sqlite.Database(path.resolve(__dirname, 'src/db/posts.db'));
const port = 6060;

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/auth', authRouter)
app.use('/posts', postRouter)
app.use('/profile', profileRouter)
app.use('/message', messageRouter)
app.get('/public/*', function (req, res) {
  return res.sendFile(path.resolve(__dirname, `server/..${req.url}`))
})
app.get('/path', (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  db.all(`SELECT * from users WHERE name = ${queryObject.name};`, [], (err, rows) => {
    return res.json({ data: rows[0].pathImg })
  })
})
app.listen(port)