import express from "express";

const router = express.Router();

router.post('/test',(req,res)=>{
    res.send(200,"Hi");
});

export default router;
