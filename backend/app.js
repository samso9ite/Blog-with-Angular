const { application } = require('express')
const express = require('express')
const app = express();
const bodyparser = require('body-parser')
const Post = require('./models/post')

const mongoose = require('mongoose')
const cors = require('cors');
app.use(bodyparser.json())
app.use(cors());
// app.use(bodyparser.urlencoded())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
})

mongoose.connect('mongodb://127.0.0.1:27017/MEANTRAINING')
    .then(() => {
        console.log('Connected to mongo...');
    }).catch(err => {
        console.log(err);
    })
  
   
app.post("/api/aad-posts", (req, res, next) => {
    // const post = req.body;
    const post = new Post(
        {
            title: req.body.title, 
            content: req.body.content
        }
    );
    post.save().then(createdPost => {
        const postId = createdPost._id
        console.log(post);
        res.status(201).json({
        message:"Post Added Successfully", postId:postId
    })
    })
  
})

app.use("/api/posts", (req, res, next) => {
    Post.find()
    .then(document => {
        res.status(200).json({
            message: "Posts retrieved successfully",
            posts: document
            }
        )
    })
})

app.delete("/api/delete_post/:id", (req, res, next) => {
    Post.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: "Post Deleted Successfully"})
    })
})
module.exports = app