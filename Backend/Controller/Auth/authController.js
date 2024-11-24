import User from "../../Models/Users/userModel.js";
import { emailValidation, passwordValidation, userCreation, userCreationResp } from "../Utils/utils.js";
import { staticResponse } from "../Utils/static.js";
import { decryptPassword } from "../Utils/passwordEncryption.js";
import { generateJwtToken, removeJwtToken } from "../../MiddleWare/jwtToken.js";

export const login = async (req, res) => {

    const { userName, password } = req.body;
    const userID = userName && userName.trim();
    const userExist = await User.findOne({ userName: userID });
    const userPassworsValid = userExist && await decryptPassword(password, userExist.password);
    const loginResponse = userExist && userPassworsValid ? staticResponse.LoginSuccess : staticResponse.Common;

    if (!userExist || !userPassworsValid) {
        return res.status(400).json({ message: !userExist ? staticResponse.LoginUserNotExist : (!userPassworsValid ? staticResponse.LoginPasswordError : staticResponse.Common) });
    }

    try {
        const user = await userCreationResp(userExist);
        await generateJwtToken(userExist?._id, res);
        return res.status(200).json({ message: loginResponse, data: user });
    }
    catch (error) {
        return res.status(401).json({ error: error });
    }
}

export const signUp = async (req, res) => {

    const { email, password, userName } = req.body;
    const validEmail = email && emailValidation(email);
    const validPassword = password && passwordValidation(password);
    const existingUser = await User.findOne({ email: email });
    const existingUserName = await User.findOne({ userName: userName });
    const errorResponse = existingUser ? staticResponse.userExist : (existingUserName ? staticResponse.userNameExist : !validPassword ? staticResponse.passwordNotValid : !validEmail ? staticResponse.emailNotValid : staticResponse.Common);

    if (!validEmail || !validPassword || existingUser || existingUserName) {
        return res.status(401).json({ error: errorResponse });
    }

    try {
        const newUser = await userCreation(req.body);
        const user = await userCreationResp(newUser);
        await newUser.save();
        await generateJwtToken(newUser?._id, res);
        return res.status(200).json({ message: staticResponse.userCreated, data: { user } });

    } catch (error) {
        return res.status(401).json({ error: error });
    }

}

export const logoff = async (req, res) => {
    try {
        const logoffReponse = staticResponse.Logoff;
        await removeJwtToken(res, logoffReponse);
        return res.status(200).json({ message: logoffReponse });
    } catch (error) {
        return res.status(401).json({ error });
    }

}
