import mongoose from "mongoose";

const userProfieModels = mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true});

export const UserProfile = mongoose.model("UserProfile",userProfieModels);
export default UserProfile;