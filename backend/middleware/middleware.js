const userData = require("../model/user.model");
const jwt = require("jsonwebtoken");

const isProtected = (req, res, next) => {
    try {
        let token = req.cookies.token ;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        jwt.verify(token, process.env.KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized: Invalid token" });
            }
            const user = await userData.findById(decoded.userId)
            if (!user) {
                return res.status(401).json({ message: "Unauthorized: User not found" });
            }
            req.user = user;
            next();
        });
    }
    catch (err) {
        console.log(err)
    }
};
module.exports = isProtected;