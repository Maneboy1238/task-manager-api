const { id } = require("zod/v4/locales");
const { User } = require("../schema/auth.schema");

async function createUser(userData) {
    const user = await User.create(userData)
    return user
}

async function getUsers() {
    const user= await User.find()
    return user 
}

async function getUser(id) {
    const user = await User.findById(id);
    return user
}

async function updateUser(id, obj) {
    const user = await User.findByIdAndUpdate(id, obj, {
        new: true,
    });
    return user
}

async function deleteUser(id) {
    const user = await User.findByIdAndDelete(id);
    return true;
}

async function userExists(obj) {
    return await User.findOne(obj)
}
module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    userExists
}