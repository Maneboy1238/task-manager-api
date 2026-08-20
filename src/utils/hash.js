const bcrypt = require("bcrypt");

const hash = {
  async create(value) {
    return await bcrypt.hash(value, 10);
  },
  async compare(obj) {
    return await bcrypt.compare(obj.normal, obj.hash);
  },
};

module.exports = hash