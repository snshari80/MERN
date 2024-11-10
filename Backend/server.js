import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRouter from './Route/Auth/AuthRouter.js';
import CommonRouter from './Route/CommonRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors());

app.get("/", CommonRouter);
app.use("/auth", AuthRouter);

app.listen(PORT,()=>{
    console.log(`Server Started On Port: ${PORT}`)
})