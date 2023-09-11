import express from 'express';
import path from 'path';



const __dirname = path.resolve();
const router = express.Router();

router.get("/about", (req, res) => {
    res.sendFile((path.join(__dirname, "./templates/index.html")))
    console.log(req.body)
})

router.get("/blog", (req, res) => {

})


export default router





