import express from "express";
import { nanoid } from "nanoid";
const router = express.Router();

let posts = [];


router.post("/post", (req, res, next) => {

    if (!req.body.title || !req.body.text) {
        res.status(403)
        res.send(`Sorry Required Parameter is Missing Type something like this {
            title: "type title",
            text: "type text",
        }`)
        return;

    }

    posts.unshift({
        id: nanoid(),
        title: req.body.title,
        text: req.body.text,
    })
    console.log(req.body)
    console.log(posts)
    res.send("Post Created")
});

router.get("/post", (req, res, next) => {
    res.send(posts);
});

router.delete("/post/:postId", (req, res, next) => {
    if (!req.params.postId) {
        res.status(403).send(`post id must be a valid id`)
    };

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === req.params.postId) {
            posts.splice(i, 1);
            res.send("post deleted with id:" + req.params.postId)
            return;
        }
    }
    res.send('post not found with id ' + req.params.postId);

});

router.put("/post/:postId", (req, res, next) => {

    if (!req.body.title || !req.body.text) {
        res.send("Sorry Your Data is missing");
        return;
    }

    for (let i = 0; i < posts.length; i++) {
        if (req.params.postId === posts[i].id) {

            posts[i].title = req.body.title;
            posts[i].text = req.body.text;

           res.send(posts);
           console.log(posts);
           return;
        }
    }
})

export default router