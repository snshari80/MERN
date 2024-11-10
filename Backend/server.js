import express from "express";
import dotenv from "dotenv";
import AuthRouter from './Routes/Auth/AuthRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.get("/login", AuthRouter);

app.listen(PORT,()=>{
    console.log(`Server Started On Port: ${PORT}`)
})