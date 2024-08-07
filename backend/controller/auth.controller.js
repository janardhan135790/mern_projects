const userData = require("../model/user.model");
const bcrypt = require("bcrypt");
const gnerateToken = require("../lib/tokengenrator");
const { json } = require("express");


const signdata = async (req, res) => {
    try {
        const { username, fullname, email, password } = req.body;
        const usernameexist = await userData.findOne({ username });
        if (!usernameexist) {
            const useremailexist = await userData.findOne({ email });
            if (!useremailexist) {
                if (password.length < 6) return res.status(404).json({ message: "Enter password more than 6 chracters" });
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt);
                const userdetails = await userData.create({
                    username,
                    fullname,
                    email,
                    password: hash,
                });
                const token = gnerateToken(userdetails._id, res)
                await userdetails.save();
                return res.status(201).json({ message: "User created Sucessfully", userdetails, token })
            } return res.status(502).json({ message: "User exist" })
        } else {
            return res.status(502).json({ message: "Username Exist" })
        }
    } catch (err) {
        console.log(err);
    }

};
const loginData = async (req, res) => {
    const { email, password } = req.body;
    try {
        const loginUser = await userData.findOne({ email });
        if (!loginUser) {
            return res.status(404).json({ message: "incorrect email or Password" });
        }
        const result = await bcrypt.compare(password, loginUser.password);
        if (loginUser && result) {
           const token =  gnerateToken(loginUser._id, res);
            return res.status(201).json({ message: "Logined Sucessfully", loginUser,token })
        } return res.status(404).json({ message: "incorrect email or password" })
    } catch (err) {
        console.log(err)
    }
};

const logOut = async (req, res) => {
    try {
        res.cookie("token", "", { expires: new Date(0) });
        res.status(200).json({ message: "Logout Successfully" });
    } catch (err) {
        console.log(err);
        if (!res.headersSent) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

module.exports = { signdata, loginData, logOut, }
