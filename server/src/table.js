const sqlite = require('sqlite3').verbose(),
        path = require('path');
const bcrypt = require('bcryptjs');
const db = new sqlite.Database(path.resolve(__dirname, './db/posts.db'), sqlite.OPEN_READRIGHT, (err) => { if (err) return console.error(err.message) });
const sql = ` CREATE TABLE comments(ID INTEGER, author, text, course, category, comments TEXT DEFAULT 0 NOT NULL, likes  TEXT DEFAULT 0 NOT NULL);`
db.run(sql)
// const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
// db.run(sql, ["pinchedmon", "temnikovalx@icloud.com", 12341234], (err) => {
//         if (err) return console.error(err.message)
// })
// const sql = "DROP TAble comments";
// db.run(sql)


// const sql = "INSERT INTO comments (id, author, text, likes) VALUES (?, ?, ?, ?)"
// db.run(sql, [2, "pinchedmon", "bro i just commented your post, its my first comment!!!!!", 0], (err) => {
//       if (err) return console.error(err.message)
//     }) 