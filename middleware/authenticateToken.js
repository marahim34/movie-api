import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(400).json({ error: "No auth header" });
    }

    const token = authHeader.substring(7);

    jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
        if (err) {
            return res.status(403).json({ error: "Token expired or invalid" });
        }

        req.user = decodedUser;
        next();
    });
};