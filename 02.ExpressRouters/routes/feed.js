
import express from 'express';
let router = express.Router()



// GET     /api/feed/:userId
router.get('/feed/:userId', (req, res, next) => {
    console.log('this is signup!', new Date());
    res.send('post created');
    console.log(req.params)
})


export default router