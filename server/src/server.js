const express = require('express'),
  app = express(),
  fs = require('fs'),
  cors = require('cors'),
  path = require('path'),
  { v4: uuidv4 } = require('uuid'),
  sqlite = require('sqlite3').verbose(),
  url = require('url'),
  authRouter = require('./authRouter'),
  multer = require('multer');

const db = new sqlite.Database(path.resolve(__dirname, './db/posts.db'), sqlite.OPEN_READWRITE, (err) => { if (err) return console.error(err.message) });
const port = 6060;

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/auth', authRouter)

const DIR = './public';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {

    cb(null, uuidv4() + '-' + file.originalname)
  }
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});
app.put('/profile', upload.single('avatar'), function (req, res, next) {
  const queryObject = url.parse(req.url, true).query;
  const urlange = req.protocol + '://' + req.get('host')
  console.log(queryObject.name)
  db.all(`UPDATE users SET pathimg = "${urlange + '/public/' + req.file.filename}" WHERE name LIKE ${queryObject.name}`, [])
  res.status(201).json({
    'profileImg': urlange + '/public/' + req.file.filename
  })
})

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

app.get('/public/*', function (req, res) {
  return res.sendFile(path.resolve(__dirname, '..' + req.url))
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
  sql = `SELECT * FROM posts WHERE id = ${queryObject.id}`
  db.all(sql, [], (err, rows) => {
    let post = rows
    let image;
    console.log(`${post[0].author}`)

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
})


app.put('/feed', function (req, res) {
  const queryObject = url.parse(req.url, true).query;
  db.all(`UPDATE posts SET likes = ${queryObject.likes} WHERE ID = ${queryObject.id}`)
});
app.put('/post', function (req, res) {
  const queryObject = url.parse(req.url, true).query;
  db.all(`UPDATE posts SET comments = ${queryObject.comments} WHERE ID = ${queryObject.id}`)
});
app.delete('/feed', (req, res) => {
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

})

app.listen(port)