import express from "express";

const router = express.Router();

router.get("/login",(req,res)=>{
   return res.status(200).json({data:'Login Call'});
})

export default router;