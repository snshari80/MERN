import jwt from "jsonwebtoken";

export const generateJwtToken = (value) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: value._id,
    }
    const token = jwt.sign(data, jwtSecretKey, { expiresIn: 50 });
    return token;
}

export const validateJwtToken = async (req,res) => {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    try {
        const token = req.cookies(tokenHeaderKey);
        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            return true;
        } else {
            return res.status(401).send(error);
        }
    } catch (error) {
        return res.status(401).send(error);
    }
}