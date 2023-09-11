import express from 'express';
import path from 'path';
const __dirname = path.resolve();
const app = express();
const port = 3000;
app.use(express.json())

import postRouter from './routes/post.mjs'



app.use("/api/v1", postRouter);


app.use(express.static(path.join(__dirname, "public",)));




app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})