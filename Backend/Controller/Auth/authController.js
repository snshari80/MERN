import User from "../../Models/Users/userModel.js";
import { emailValidation, passwordValidation, userCreation, userCreationResp } from "../Utils/utils.js";
import { staticResponse } from "../Utils/static.js";
import { decryptPassword } from "../Utils/passwordEncryption.js";
import { generateJwtToken } from "./jwtToken.js";

export const login = async (req, res) => {

    const { userName, password } = req.body;
    const userID = userName.trim();
    const userExist = await User.findOne({ userName: userID });

    if (!userExist) {
        return res.status(404).json({ message: staticResponse.LoginUserNotExist });
    }

    const user = await decryptPassword(password, userExist.password);

    if (!user) {
        return res.status(400).json({ message: staticResponse.LoginPasswordError });
    }

    try {
        const generateUserToken = await generateJwtToken(user);
        res.cookie('gfg_token_header_key', generateUserToken);
        return res.status(200).json({  message: staticResponse.LoginSuccess });
    }
    catch (error) {
        return res.status(400).json({ error: error });
    }
}

export const signUp = async (req, res) => {

    const { email, password } = req.body;
    const validEmail = emailValidation(email);
    const validPassword = passwordValidation(password);
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
        return res.status(400).json({ error: staticResponse.userExist });
    }

    if (!validEmail) {
        return res.status(400).json({ error: staticResponse.emailNotValid });
    }

    if (!validPassword) {
        return res.status(400).json({ error: staticResponse.passwordNotValid });
    }

    try {
        const newUser = await userCreation(req.body);
        if (newUser) {
            await newUser.save();
            const generateUserToken = await generateJwtToken(user);
            res.cookie('gfg_token_header_key', generateUserToken);
            return res.status(201).json({ message: staticResponse.userCreated, data: { user } });
        } else {
            return res.status(400).json({ error: staticResponse.creationError });
        }

    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

export const signUpTest = async (req, res) => {

}
