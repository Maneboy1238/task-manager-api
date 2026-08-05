const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const crypto = require('crypto');
const { handleErrors } = require('../utils/helpers');
const { createUser, getUser, userExists } = require("../models/user.model")
const { User } = require("../schema/auth.schema")

async function signupUsersHandler(req, res) {
try {
    const { body } = req;
        const hashedPassword = await bcrypt.hash(body.password, 10);
        if (await userExists({username: body.username})) {
            res.status(409).send('user already exists')
        }
        const user = await createUser({
            name: body.name,
            username: body.username,
            email: body.email,
            password: hashedPassword,
        })
        const {password ,_v, ...userInfo} = user._doc
        createAccessToken(res, userInfo)
        console.log(userInfo)
        return res.status(201).json(userInfo);
    } catch(error) {
        handleErrors(res, error)
    }
}

async function loginUsersHandler(req, res) {
    try {
    const { body } = req;
    const user = await userExists({username: body.username})
    if (user) {
        await checkPassword({ sent: body.password, hash: user.password});
        const {password, ...userInfo} = user._doc
        createAccessToken(res, userInfo)
        res.json(userInfo);
    } else {
        res.sendStatus(404);
    }
    } catch (error) {
    handleErrors(res, error);
    }
}

const checkPassword = async (password) => {
    const userPasswordIsCorrect = await bcrypt.compare(password.sent, password.hash);
    if (!userPasswordIsCorrect) throw new AppError({message: 'user password is incorrect', statusCode: 401})
};

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