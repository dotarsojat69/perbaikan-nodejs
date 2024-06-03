'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsTo(models.User, {
        foreignKey: 'userId',
      })
    }
  }
  Products.init({
    name: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    desc: DataTypes.STRING,
    price: DataTypes.FLOAT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};