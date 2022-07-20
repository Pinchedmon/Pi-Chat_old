const sqlite = require('sqlite3').verbose(),
        path = require('path');
const bcrypt = require('bcryptjs');
const db = new sqlite.Database(path.resolve(__dirname, './db/posts.db'), sqlite.OPEN_READRIGHT, (err) => { if (err) return console.error(err.message) });
// const sql = ` CREATE TABLE users (ID INTEGER PRIMARY KEY AUTOINCREMENT, name, email, password, roles DEFAULT "USER", pathImg DEFAULT './uploads/default.jpeg');`
// db.run(sql)
// const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
// db.run(sql, ["pinchedmon", "temnikovalx@icloud.com", 12341234], (err) => {
//         if (err) return console.error(err.message)
// })
// const sql = "DROP TAble users";
// db.run(sql)


// const sql = "INSERT INTO comments (id, author, text, likes) VALUES (?, ?, ?, ?)"
// db.run(sql, [2, "pinchedmon", "bro i just commented your post, its my first comment!!!!!", 0], (err) => {
//       if (err) return console.error(err.message)
//     }) 