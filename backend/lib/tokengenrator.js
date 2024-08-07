
const jwt = require("jsonwebtoken");

const gnerateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.KEY, { expiresIn: '5d' });
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax' 
    });
    return token;
};
module.exports = gnerateToken;