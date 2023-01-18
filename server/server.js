const express = require('express'),
  app = express(),
  cors = require('cors'),
  http = require('http'),
  path = require('path'),
  sqlite = require('sqlite3').verbose(),
  url = require('url'),
  { Server } = require("socket.io"),
  db = new sqlite.Database(path.resolve(__dirname, 'src/db/posts.db')),
  port = 6060,
  server = http.createServer(app),
  io = new Server(server, {
    cors: "localhost:3000",
    serveClient: true
  }),
  authRouter = require('./src/Routes/authRouter'),
  postRouter = require('./src/Routes/postRouter'),
  profileRouter = require('./src/Routes/profileRouter'),
  messageRouter = require('./src/Routes/messageRouter'),
  commentRouter = require('./src/Routes/commentRouter'),
  followRouter = require('./src/Routes/followRouter'),
  notifsRouter = require('./src/Routes/notifsRouter'),
  registerUserHandlers = require('./src/Routes/handlers/userHandlers');


app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({}))

app.use('/auth', authRouter)
app.use('/posts', postRouter(io))
app.use('/profile', profileRouter)
app.use('/message', messageRouter)
app.use('/comment', commentRouter)
app.use('/follow', followRouter)
app.use('/notifs', notifsRouter)

app.get('/public/*', function (req, res) {
  return res.sendFile(path.resolve(__dirname, "server", `..${req.url}`))
})
app.get('/path', (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  db.all(`SELECT * from users WHERE name = ${queryObject.name};`, [], (err, rows) => {
    return res.json({
      data: rows[0].pathImg,
      status: 200
    })
  })
})

let onlineUsers = [];

io.on('connection', (socket) => {
  registerUserHandlers(io, socket, onlineUsers)
});


server.listen(port)

