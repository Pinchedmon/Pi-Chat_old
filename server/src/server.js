'use strict';
const express = require('express'),
  app = express(),
  fs = require('fs'),
  cors = require('cors'),
  path = require('path'),
  { parse } = require('querystring')


const wayToFile = path.resolve(__dirname, 'db.json')

const port = 6060
//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use((req, res, next) => {
  fs.readFile(wayToFile, (err, data) => {
    if (err)
      return res
        .status(500)
        .send({ message: 'Error while getting users' })
    req.posts = JSON.parse(data)
    console.log(req.posts)
    next()
  })
})
  .route('/feed')
  .get((req, res) => {
    if (req.posts !== undefined) {
      return res.status(200)
        .send(req.posts)
    } else {
      console.log(req.posts)
      return res.status(404)
        .send({ message: 'Not Found' })
    }
  })
  .post((req, res) => {
    console.log(req.posts.posts)
    req.posts.posts.push(req.body); 
    fs.writeFile(wayToFile, JSON.stringify(req.posts), 'utf8', function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }
      console.log("JSON file has been saved.");
    });


  })
app.listen(port)