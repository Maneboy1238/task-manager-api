const { id } = require("zod/v4/locales");
const User = require("../schema/auth.schema");
const userModel = {
    async create(userData) {
    const user = await User.create(userData)
    return user
},

async getAll() {
    const user= await User.find()
    return user 
},

async get(id) {
    const user = await User.findById(id);
    return user
},

async update(id, obj) {
    const user = await User.findByIdAndUpdate(id, obj, {
        new: true,
    });
    return user
},

async  delete(id) {
    const user = await User.findByIdAndDelete(id);
    return true;
},

async  exists(obj) {
    return await User.findOne(obj)
},
}

module.exports = userModel;