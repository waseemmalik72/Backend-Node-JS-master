import express from 'express';
import path from 'path';
const __dirname = path.resolve();
const app = express();
const port = 3000;
app.use(express.json());

// const waseemMiddleWare = (req, res, next) => {
//     res.send("hello world")
//     console.log(req.body)
// }
// app.use(waseemMiddleWare)
// app.get("/", waseemMiddleWare)

app.use(express.static(path.join(__dirname, "public")));

app.get('/about/:name', (req, res) => {
    res.send("hello world" + " " + req.params.name );
    // console.log(req.body)
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
})