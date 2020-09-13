const database = require('../models');

class UserService {
  static async getAllUsers() {
    return database.User.findAll();
  }

  static async addUser(newUser) {
    return database.User.create(newUser);
  }

  static async updateUser(id, updateUser) {
    const usertoUpdate = await database.User.findOne({ where: { id: Number(id) } });

    if (usertoUpdate) {
      await database.User.update(updateUser, { where: { id: Number(id) } });
      return updateUser;
    }
    return null;
  }

  static async getAUser(id) {
    const theUser = await database.User.findOne({ where: { id: Number(id) } });
    return theUser;
  }

  static async deleteUser(id) {
    const usertoDelete = await database.User.findOne({ where: { id: Number(id) } });

    if (usertoDelete) {
      const deletedUser = await database.User.destroy({ where: { id: Number(id) } });
      return deletedUser;
    }
    return null;
  }
}

module.exports = UserService;
