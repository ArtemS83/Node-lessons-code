'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Gender, {
        foreignKey: 'gender',
        onDelete: 'CASCADE',
      })
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      token: DataTypes.STRING,
      gender: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User',
    },
  )
  return User
}
