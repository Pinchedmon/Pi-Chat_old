const sqlite = require('sqlite3').verbose(),
        path = require('path');
const bcrypt = require('bcryptjs');
const db = new sqlite.Database(path.resolve(__dirname, './db/posts.db'), sqlite.OPEN_READRIGHT, (err) => { if (err) return console.error(err.message) });
//const sql = ` CREATE TABLE users(ID INTEGER PRIMARY KEY autoIncrement, name, email, password, roles DEFAULT 'user');`
//db.run(sql)
// const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
// db.run(sql, ["pinchedmon", "temnikovalx@icloud.com", 12341234], (err) => {
//         if (err) return console.error(err.message)
// })
//const sql = "DROP TAble users";
//db.run(sql)
let candidat;
// const { name, email, password } = req.body;
let name = 'lexa';
let email = 'lexa@lexa.com';
let password = 'lexa';
const hashPassword = bcrypt.hashSync(password, 5)
sql = `SELECT * FROM users WHERE name = "${name}"`
db.all(sql, [], (err, rows) => {
        candidat = rows.length;
});
if (candidat === 0) {
        db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashPassword], (err) => {
                if (err) console.log(err)
                console.log(200)

        })
} else console.log({
        status: 201,
        message: "Такое имя уже существует"
})

// const sql = "INSERT INTO comments (id, author, text, likes) VALUES (?, ?, ?, ?)"
// db.run(sql, [2, "pinchedmon", "bro i just commented your post, its my first comment!!!!!", 0], (err) => {
//       if (err) return console.error(err.message)
//     }) 