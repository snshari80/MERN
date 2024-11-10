import User from "../../Models/Users/userModel.js";
import { encryptPassword } from "../Utils/passwordEncryption.js";
import UserCreation from "../../Models/Users/userCreation.js";

export const emailValidation = (data) => {
    if (data) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(data);
    }
}

export const passwordValidation = (data) => {
    if (data) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        return passwordRegex.test(data);
    }
}

export const userCreation = async (data) => {
    const { userName, firstName, lastName, email, password } = data;
    const hashPassword = await encryptPassword(password);
    const user = new User({ userName, firstName, lastName, email, password: hashPassword });
    return user;
}

export const userCreationResp = async (data) => {
    const { _id, userName, email } = data;
    const user = new UserCreation({ _id, userName, email });;
    return user;
}