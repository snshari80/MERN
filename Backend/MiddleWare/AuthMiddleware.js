import { validateJwtToken } from "../Controller/Auth/jwtToken.js";

const protectedRouter = async (req, res, next) => {
    const validRoute = await validateJwtToken(req, res);
    if(!validRoute){
        res.status(401).json({ error: "AuthToken expired" });
    }
}

export default protectedRouter;