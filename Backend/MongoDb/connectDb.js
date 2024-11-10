import mongoose from "mongoose";

const connectMongoDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(`MongoDb Error Details : ${error}`);
        process.exit(1);
    }
}
export default connectMongoDb;
