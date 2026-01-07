const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract from "Bearer <token>"
    
    if (!token) {
        return res.status(401).json({ status: "error", message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "Jouno");
        req.userId = decoded._id; // Attach user ID to request
        next();
    } catch (error) {
        return res.status(401).json({ status: "error", message: "Invalid token", error: error.message });
    }
};

module.exports = verifyToken;
