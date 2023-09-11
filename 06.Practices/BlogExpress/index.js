import express from 'express';
import path from 'path';
import cors from 'cors';
import blogRouter from './routes/blog.js'
const __dirname = path.resolve();
const app = express();
const port = 3000;
app.use(express.json());

app.use("/", blogRouter)
app.use("/", blogRouter)
// app.use(express.static(path.join(__dirname, "static")));



app.listen(port, () => {
    console.log(`Blog app listening on port http://localhost:${port}`);
})