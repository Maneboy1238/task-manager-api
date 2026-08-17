const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service');

async function signupUsersHandler(req, res) {
    const { body } = req;
    const user = await authService.signup(body)
    createAccessToken(res, {uid: user._id})
    res.status(201).json(user)
}

async function loginUsersHandler(req, res) {
    const { body } = req
    const user = await authService.login(body)
    createAccessToken(res, {uid: user._id})
    res.status(200).json(user);
}

function createAccessToken(res, userInfo) {
        const token  = jwt.sign(userInfo, process.env.MY_SECRET, {
            expiresIn: "10m"
        })
        res.cookie('accessToken', token, {
            httpOnly: true,
            maxAge: 10 * 60 * 1000
            //secure: true
        })
}
module.exports = {
    signupUsersHandler,
    loginUsersHandler
}