import User from "../../Models/Users/userModel.js";
import UserProfile from "../../Models/Users/userProfile.js";
import { staticResponse } from "../Utils/static.js";

export const fetchProfile = async (req, res) => {
    const { id } = req.body;
    try {
        const user = await User.findOne({ _id: id });
        const ErrorReponse = user ? staticResponse.LoginUserNotExist : (id ? staticResponse.CommonPharse : staticResponse.Common)
        if (!user || ErrorReponse) {
            return res.status(404).json({ error: ErrorReponse });
        }
        const userProfile = new UserProfile(user);
        return res.status(200).json({ message: staticResponse.userProfileRetrived, userProfile });
    } catch (error) {
        return res.status(401).json({ error: error });
    }
}
