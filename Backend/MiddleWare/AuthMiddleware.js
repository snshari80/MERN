import { validateJwtToken } from "./jwtToken.js";

const protectedRouter = async (req, res, next) => {
    try {
        await validateJwtToken(req, res, next);
    } catch (error) {
        return res.status(401).json({ error: error });
    }
}

export default protectedRouter;