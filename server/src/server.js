const express = require('express'),
    app = express(),
    fs = require('fs'),
    cors = require('cors')
const posts = require('./db/posts.json')
const port = 6060
app.use(cors()) 
app.use((req, res, next) => {
    console.log(posts)
    req.posts = posts
    next()
})
    .route('/feed')
    .get((req,res)=>{
        return res.status(200)
                .send(req.posts)
    })
app.listen(port)