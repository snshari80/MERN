import { validateJwtToken } from "../Controller/Auth/jwtToken.js";

const protectedRouter = async (req, res, next) => {
    try {
        await validateJwtToken(req, res, next);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

export default protectedRouter;