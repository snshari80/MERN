import mongoose from "mongoose";

const userCreationModels = mongoose.Schema({
    _id: {
        type: String,
    },
    userName: {
        type: String,
    },
    email: {
        type: String,
    }
}, { timestamps: true });

export const UserCreation = mongoose.model("UserCreation", userCreationModels);
export default UserCreation;