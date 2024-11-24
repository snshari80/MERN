import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRouter from "./Route/Auth/authRouter.js";
import FetchRouter from "./Route/Fetch/FetchRouter.js";
import CommonRouter from "./Route/commonRouter.js";
import connectMongoDb from "./MongoDb/connectDb.js";
import bodyParser from "body-Parser";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));


app.use("/", CommonRouter);
app.use("/auth", AuthRouter);
app.use("/fetch", FetchRouter);

app.listen(PORT,()=>{
    console.log(`Server Started On Port: ${PORT}`);
    connectMongoDb();
})