const sqlite = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const paginate = require("jw-paginate");
const url = require('url');
const sharp = require('sharp');
const db = new sqlite.Database(path.resolve(__dirname, '../../db/posts.db'), sqlite.OPEN_READWRITE, (err) => { if (err) return console.error(err.message) });
class messageController {
    async postMessage(req, res) {
        if (req.file) {
            await sharp(req.file.path).resize().jpeg({
                quality: 50
            }).toFile('public/' + req.file.filename);
        }
        const queryObject = url.parse(req.url, true).query;
        const urlange = req.protocol + '://' + req.get('host')
        let messageImg;
        if (req.file) {
            messageImg = urlange + "/public/" + req.file.filename;
        } else {
            messageImg = "";
        }
        let names = `${queryObject.secondName} ${queryObject.name}`
        db.all(`SELECT * from messages WHERE names = '${names}' OR names = '${names.split(' ').reverse().join(' ')}'`, [], (err, rows) => {

            if (rows.length < 1) {
                db.run('INSERT INTO messages (names) VALUES  (?)', [names])
            }
            db.run('INSERT INTO messages_info (names, name, text, messageImg, time) VALUES  (?,?,?,?,?)', [names.toString(), `${queryObject.name}`, `${queryObject.text}`, messageImg, `${queryObject.time}`], () => {
                db.all(`SELECT * from messages_info WHERE names = '${names}' and text = '${queryObject.text}' and name = '${queryObject.name}'`, [], (err, message) => {
                    return res.json({ status: 200, message: message[0] })
                })

            })
        })
    }
    async getLinks(req, res) {
        const queryObject = url.parse(req.url, true).query;
        db.all(`SELECT * FROM messages WHERE names LIKE '%${queryObject.name}%'`, [], (err, rows) => {
            if (rows.length > 0) {
                for (let i = 0; i < rows.length; i++) {
                    db.all(`SELECT pathImg FROM users WHERE name = "${rows[i].names.replace(queryObject.name, '').trim()}"`, [], (err, user) => {
                        rows[i]["backImg"] = user[0].pathImg
                        db.all(`SELECT text, time FROM messages_info WHERE names = "${rows[i].names}" OR names = "${rows[i].names.split(' ').reverse().join(' ')}" ORDER BY ID DESC`, [], (err, message) => {
                            rows[i]["last"] = ''
                            rows[i]["date"] = ''
                            if (message.length !== 0) {
                                rows[i]["last"] = message[0].text
                                rows[i]["date"] = message[0].time
                            }
                            if (i == rows.length - 1) {
                                return res.json({ data: rows, status: 200 })
                            }
                        })

                    })
                }
            } else {
                return res.json({ data: [], status: 200 })
            }
        })
    }
    async getMessages(req, res) {
        const queryObject = url.parse(req.url, true).query;
        db.all(`SELECT * FROM messages_info WHERE names = '${queryObject.names}' OR names = '${queryObject.names.split(' ').reverse().join(' ')}' `, [], (err, rows) => {
            const page = parseInt(queryObject.page);
            const pager = paginate(rows.length, page, queryObject.count);
            const pageOfItems = rows.reverse().slice(pager.startIndex, pager.endIndex + 1);
            if (page > pager.totalPages) {
                return res.json({
                    status: 200,
                    data: [],
                    items: []
                })
            } else {
                return res.json({
                    status: 200,
                    items: [...pageOfItems],
                    page: Number(queryObject.page) + 1,
                })
            }
        })
    }
    async deleteDialog(req, res) {
        const queryObject = url.parse(req.url, true).query;
        db.run(`DELETE FROM messages_info WHERE names = '${queryObject.names}' OR names = '${queryObject.names.split(' ').reverse().join(' ')}'`, [])
        db.run(`DELETE FROM messages WHERE names = '${queryObject.names}' OR names = '${queryObject.names.split(' ').reverse().join(' ')}'`, [])
        return res.json({ status: 200 })
    }
    async deleteMessages(req, res) {
        const queryObject = url.parse(req.url, true).query;
        let id = queryObject.id.split(' ')
        for (let i = 0; i < id.length; i++) {
            db.all(`SELECT messageImg FROM messages_info WHERE id = "${id[i]}"`, [], (err, img) => {
                if (img.length > 0) {
                    if (img[0].messageImg !== '') {
                        fs.unlinkSync(path.resolve(__dirname, `../../../public/${img[0].messageImg.slice(28, img[0].messageImg.length)}`))
                        fs.unlinkSync(path.resolve(__dirname, `../../../public/original/${img[0].messageImg.slice(28, img[0].messageImg.length)}`))
                    }
                }
            })
            db.all(`DELETE FROM messages_info WHERE id = "${id[i]}"`, [], (err, rows) => { })

        }
        return res.json({ status: 200 })
    }
}
module.exports = new messageController;