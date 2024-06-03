'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Store);
      User.hasMany(models.Products, {
        foreignKey: "userId",
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email sudah ada",
      },
      validate: {
        isEmail: {
          msg: "format email salah",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkPassword(value) {
          const passwordRegex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
          if (!passwordRegex.test(value)) {
            throw new Error(
              "Password harus 6 karakter, disertai dengan simbol, angka, dan karakter spesial."
            );
          }
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        isUnique: async (value) => {
          const user = await User.findOne({
            where: {
              username: value,
            },
          });

          if (user) {
            throw new Error("Username sudah ada");
          }
        },
      },
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
  });

  return User;
};