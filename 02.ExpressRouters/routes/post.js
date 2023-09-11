
import express from 'express';
import { nanoid } from 'nanoid';
let router = express.Router();

// Move the posts array outside the router's scope
// let posts = [
//     {
//         id: nanoid(),
//         title: "title data",
//         text: "text data"
//     }
// ]

let posts = [];

// POST    /api/v1/post
router.post('/post', (req, res, next) => {
    console.log('This is post data!', new Date());

    if (!req.body.title || !req.body.text) {
        res.status(403);
        res.send(`required parameters missing, 
      example request body:
      {
        title: "abc post title",
        text: "some post text"
      } `);
        return;
    }

    posts.unshift({
        id: nanoid(),
        title: req.body.title,
        text: req.body.text,
    })

    console.log(req.body);
    console.log(posts)
    res.send(`Post Created`);
});

router.get(`/post`, (req, res, next) => {
    res.send(posts)
})


// GET     /api/v1/post/:userId/:postId
router.get('/post/:postId', (req, res, next) => {
    console.log('Yes Data Has Been Available!', new Date());
    console.log(req.params.postId)
    // res.send('Data Send Successfully');

    if (isNaN(req.params.postId)) {
        res.status(403)
        res.send(`post id must be a valid number, no alphabet is allowed in post id`)
    }

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === req.params.postId) {
            res.send(posts[i]);
            return;
        }
    }
    // res.send('post not found with id ' + req.params.postId);

})


// PUT     /api/v1/post/:userId/:postId
router.put('/post/:userId/:postId', (req, res, next) => {
    console.log('this is signup!', new Date());
    res.send('post created');
    console.log(req.params)
})


// DELETE  /api/v1/post/:userId/:postId
router.delete('/post/:userId/:postId', (req, res, next) => {
    console.log('this is signup!', new Date());
    res.send('post created');
    console.log(req)
})

export default router