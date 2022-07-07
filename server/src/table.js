const sqlite = require('sqlite3').verbose(),
        path = require('path');
const db = new sqlite.Database(path.resolve(__dirname,'./db/posts.db'), sqlite.OPEN_READRIGHT, (err) => { if (err) return console.error(err.message) });
//  const sql = ` CREATE TABLE posts(ID INTEGER PRIMARY KEY autoIncrement, author, text,  course, category, comments, likes);`
//  db.run(sql) 
// const sql = "INSERT INTO posts (author, text, course, category, comments, likes) VALUES (?, ?, ?, ?, ?, ?)"
// db.run(sql, ["pinchedmon", "bro i just want to wake up and do this work. Do you really think that i can do this work solo? Yes i can. I ve done a lot, u can see", 1,  "общее",  0], (err) => {
//       if (err) return console.error(err.message)
//     })  
// const sql = "DROP TAble posts";
// db.run(sql)
 
// const sql = "INSERT INTO comments (id, author, text, likes) VALUES (?, ?, ?, ?)"
// db.run(sql, [2, "pinchedmon", "bro i just commented your post, its my first comment!!!!!", 0], (err) => {
//       if (err) return console.error(err.message)
//     })  