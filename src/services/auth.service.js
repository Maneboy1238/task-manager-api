const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const { AppError } = require("../utils/helpers");

const authService = {
  async signup(body) {
    if (await userModel.exists({ username: body.username })) {
      throw new AppError({
        statusCode: 409,
        message: "Username already exists",
      });
    }
    const hashedPassword = await createHash(body.password);
    const user = await userModel.create({
      name: body.name,
      username: body.username,
      email: false,
      password: hashedPassword,
    });
    const { password, _v, ...userInfo } = user._doc;
    console.log(user.email);
    return userInfo;
  },
  async login(body) {
        const user = await userModel.exists({username: body.username})
        if (!user) throw new AppError({statusCode: 404, message: "user not found"})
        if (await checkPassword({ sent: body.password, hash: user.password})) throw new AppError({statusCode: 409, message: "incorrect passsword"});
        const {password, ...userInfo} = user._doc
        console.log(userInfo)
        return userInfo;
    
  }
};

async function createHash(password) {
  return await bcrypt.hash(password, 10);
}
async  function checkPassword(password) {
    return await bcrypt.compare(password.sent, password.hash)
}
module.exports = authService;
