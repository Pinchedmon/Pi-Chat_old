const sqlite = require('sqlite3').verbose(),
        path = require('path');
const db = new sqlite.Database(path.resolve(__dirname,'./db/posts.db'), sqlite.OPEN_READRIGHT, (err) => { if (err) return console.error(err.message) });
//  const sql = ` CREATE TABLE posts(ID INTEGER PRIMARY KEY AUTOINCREMENT, author, text, course, category, comments, likes, date);`
//  db.run(sql) 
const sql = "INSERT INTO posts (author, text, course, category, comments, likes, date) VALUES (?, ?, ?, ?, ?, ?, ?)"
db.run(sql, ["pinchedmon", "bro i just want to wake up and do this work. Do you really think that i can do this work solo? Yes i can. I ve done a lot, u can see", 1,  "общее",  0, 0, new Date().toJSON()], (err) => {
      if (err) return console.error(err.message)
    })  
// const sql = "DROP TAble posts";
// db.run(sql)