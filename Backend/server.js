import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRouter from "./Route/Auth/authRouter.js";
import CommonRouter from "./Route/commonRouter.js";
import connectMongoDb from "./MongoDb/connectDb.js";
import bodyParser from "body-Parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));


app.use("/", CommonRouter);
app.use("/auth", AuthRouter);

app.listen(PORT,()=>{
    console.log(`Server Started On Port: ${PORT}`);
    connectMongoDb();
})