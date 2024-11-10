import express from "express";

const router = express.Router();

router.get("/",(req,res)=>{
    console.log("here Login");
    res.send("Hello");
})

export default router;