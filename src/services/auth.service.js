const userModel = require("../models/user.model");
const { AppError } = require("../utils/error");
const hash = require("../utils/hash");

const authService = {
  async signup(body) {
    if (await userModel.getByField({ username: body.username })) {
      throw new AppError({
        statusCode: 409,
        message: "Username already exists",
      });
    }
    const hashedPassword = await hash.create(body.password);
    const user = await userModel.create({
      name: body.name,
      username: body.username,
      email: body.email,
      password: hashedPassword,
    });
    const { password, _v, ...userInfo } = user._doc;
    console.log(user.email);
    return userInfo;
  },
  async login(body) {
        const user = await userModel.getByField({username: body.username})
        if (!user) throw new AppError({statusCode: 404, message: "user not found"})
        if (!await hash.compare({ normal: body.password, hash: user.password})) throw new AppError({statusCode: 401, message: "incorrect passsword"});
        const {password, ...userInfo} = user._doc
        console.log(userInfo)
        return userInfo;
    
  }
};


module.exports = authService;
