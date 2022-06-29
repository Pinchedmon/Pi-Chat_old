const sqlite = require('sqlite3').verbose(),
        path = require('path');
const db = new sqlite.Database(path.resolve(__dirname,'./db/posts.db'), sqlite.OPEN_READRIGHT, (err) => { if (err) return console.error(err.message) });
const sql = ` CREATE TABLE posts(ID INTEGER PRIMARY KEY AUTOINCREMENT, author, text, date, comments, likes)`
db.run(sql) 