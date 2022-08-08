const sqlite = require('sqlite3').verbose(),
        path = require('path');
const bcrypt = require('bcryptjs');
const db = new sqlite.Database(path.resolve(__dirname, './db/posts.db'), sqlite.OPEN_READRIGHT, (err) => { if (err) return console.error(err.message) });
// const sql = ` CREATE TABLE comments (ID INTEGER, author, text, comments TEXT, likes TEXT DEFAULT "0", userImg, commentImg);`
// db.run(sql)
// const sql = ` CREATE TABLE posts (ID INTEGER PRIMARY KEY AUTOINCREMENT, author, text, course, category, comments default 0, likes default 0, userImg, postImg);`
// db.run(sql)
// const sql = ` CREATE TABLE users (ID INTEGER PRIMARY KEY AUTOINCREMENT,name, email, password, roles DEFAULT "USER", pathImg DEFAULT "http://localhost:6060/public/default.jpeg", backImg  DEFAULT "http://localhost:6060/public/default.jpeg", about);`
// db.run(sql)
// const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
// db.run(sql, ["pinchedmon", "temnikovalx@icloud.com", 12341234], (err) => {
//         if (err) return console.error(err.message)
// })
// const sql = "DROP TAble posts";
// db.run(sql)
// db.run('CREATE TABLE likes ( name, postId, commentId)')



// const sql = "INSERT INTO comments (id, author, text, likes) VALUES (?, ?, ?, ?)"
// db.run(sql, [2, "pinchedmon", "bro i just commented your post, its my first comment!!!!!", 0], (err) => {
//       if (err) return console.error(err.message)
//     }) 