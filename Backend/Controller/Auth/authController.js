import User from "../../Models/Users/userModel.js";
import { emailValidation, passwordValidation, userCreation, userCreationResp } from "../Utils/utils.js";
import { staticResponse } from "../Utils/static.js";

export const signIn = (req, res) => {

}

export const signUp = async (req, res) => {

    try {
        const { email, password } = req.body;
        const validEmail = emailValidation(email);
        const validPassword = passwordValidation(password);

        if (!validEmail) {
            return res.status(400).json({ error: staticResponse.emailNotValid });
        }

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ error: staticResponse.userExist });
        }

        if (!validPassword) {
            return res.status(400).json({ error: staticResponse.passwordNotValid });
        }

        const newUser = await userCreation(req.body);

        if (newUser) {
            await newUser.save();
            const user = await userCreationResp(newUser);
            return res.status(201).json({ message: staticResponse.userCreated, data: { user } });
        } else {
            return res.status(400).json({ error: staticResponse.creationError });
        }

    } catch (error) {
        return res.status(400).json({ error: error });
    }
}
