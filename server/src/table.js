const sqlite = require('sqlite3').verbose(),
        path = require('path');
const bcrypt = require('bcryptjs');
const db = new sqlite.Database(path.resolve(__dirname, './db/posts.db'), sqlite.OPEN_READRIGHT, (err) => { if (err) return console.error(err.message) });
// const sql = ` CREATE TABLE comments (ID INTEGER, author, username, text, comments TEXT, likes TEXT DEFAULT "0", userImg, commentImg);`
// db.run(sql)
// const sql = ` CREATE TABLE posts (ID INTEGER PRIMARY KEY AUTOINCREMENT, name, text, course, category, comments default 0, likes default 0, postImg);`
// db.run(sql)
//  const sql = ` CREATE TABLE users (ID INTEGER PRIMARY KEY AUTOINCREMENT,username, name, email, password, roles DEFAULT "USER", pathImg DEFAULT "http://localhost:6060/public/default.jpeg", backImg  DEFAULT "http://localhost:6060/public/default.jpeg", info);`
//  db.run(sql)
// const sql = "INSERT INTO users (name, username,info, email, password) VALUES (?, ?, ?)"
// db.run(sql, ["pinchedmon", "temnikovalx@icloud.com", 12341234], (err) => {
//         if (err) return console.error(err.message)
// })
// const sql = "DROP TAble messages_info";
// db.run(sql)
// db.run('CREATE TABLE comments ( ID INTEGER, name, text, comments default 0, likes default 0, commentImg)')

// const sql = ` CREATE TABLE messages (ID INTEGER PRIMARY KEY AUTOINCREMENT, names, last TEXT);`
// db.run(sql)
// const sql = ` CREATE TABLE messages_info (ID INTEGER PRIMARY KEY AUTOINCREMENT, names, name, text, messageImg);`
// db.run(sql)
