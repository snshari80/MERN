import jwt from "jsonwebtoken";

export const generateJwtToken = (user, res) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let data = {
        time: Date(),
        userId: user._id,
    }
    const token = jwt.sign(data, jwtSecretKey, { expiresIn: 900 });
    return res.cookie(tokenHeaderKey, token, {
        maxAge: 15 * 24 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict'
    });
}

export const validateJwtToken = async (req, res, next) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    try {
        const token = req.cookies[tokenHeaderKey];
        const verifyToken = jwt.verify(token, jwtSecretKey);
        if (verifyToken) {
            next();
        }
    } catch (error) {
        return res.status(400).json({ error: error?.message });
    }
}

export const removeJwtToken = async (res) => {
    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    return res.cookie(tokenHeaderKey, "", {
        maxAge: 0
    });
}
