const { application } = require('express')
const express = require('express')
const app = express();

app.use("/api/posts", (req, res, next) => {
    const posts =[{
        id: 1,
        title: "First Post in Angular",
        content: "This is my very first post in angular MEAN STACK"
    }, 
    {
        id: 2,
        title: "Second Post in MEAN STACK development",
        content: "This is my very second post in MEAN STACK Enjoy!"
    }
]

res.status(200).json({
    message: "Posts retrieved successfully",
    posts: posts
    }
)
})

module.exports = app