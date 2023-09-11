import express from 'express';
import path from 'path';
// import cors from 'cors';
const __dirname = path.resolve();
const app = express();
app.use(express.json());
// app.use(cors());

import authRouter from './routes/auth.js'
import commentRouter from './routes/comment.js'
import feedRouter from './routes/feed.js'
import postRouter from './routes/post.js'

app.use("/api/v1/", authRouter)

app.use((req, res, next) => {
    const token = "valid"
    if (token === "valid") {
        next();
    } else {
        res.send({ message: "invalid token" })

    }
})

app.use("/api/v1", commentRouter)
app.use("/api/v1", postRouter)
app.use("/api/v1", feedRouter)



const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
})