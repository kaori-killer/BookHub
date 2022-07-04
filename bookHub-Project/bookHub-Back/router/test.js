import express from "express";

const router = express.Router();

router.post('/',(req,res)=>{
    res.send(200,"Hi");
});

export default router;
