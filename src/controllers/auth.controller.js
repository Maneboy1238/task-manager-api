const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const crypto = require('crypto');
const { handleErrors } = require('../utils/helpers');
const users = require('../utils/constants')
const { createUser, userExists } = require("../models/user.model")

const checkPassword = async (password) => {
    const userPasswordIsCorrect = await bcrypt.compare(password.sent, password.hash);
    if (!userPasswordIsCorrect) throw new AppError({message: 'user password is incorrect', statusCode: 401})
};


async function signupUsersHandler(req, res) {
try {
    const { body } = req;
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const user = {
            id: crypto.randomUUID(),
            firstName: body.name,
            lastName: body.lastName,
            username: body.username,
            email: body.email,
            password: hashedPassword,
        };
        await createUser(user);
        const {password , ...userInfo} = user
        const token  = jwt.sign(userInfo, process.env.MY_SECRET, {
            expiresIn: "10m"
        })
        res.cookie('accessToken', token, {
            httpOnly: true,
            maxAge: 10 * 60 * 1000
            //secure: true
        })
        return res.status(201).json(userInfo);
    } catch(error) {
        handleErrors(res, error)
    }
}

async function loginUsersHandler(req, res) {
    try {
    const { body } = req;
    const user = await userExists(body.id)
    if (user) {
        await checkPassword({ sent: body.password, hash: user.password});
        const {password, ...userInfo} = user
        const token = jwt.sign(userInfo, process.env.MY_SECRET, {
            expiresIn: '10m'
        })
        res.cookie('accessToken', token, {
            httpOnly: true,
            maxAge: 10 * 60 * 1000,
            //secure: true
        })
        res.json(userInfo);
    } else {
        res.sendStatus(404);
    }
    } catch (error) {
    handleErrors(res, error);
    }
}
module.exports = {
    signupUsersHandler,
    loginUsersHandler
}