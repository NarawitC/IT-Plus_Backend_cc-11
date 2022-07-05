const { USER_ROLE } = require('../config/constants');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      address: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      role: {
        type: DataTypes.ENUM(USER_ROLE.CLIENT, USER_ROLE.SUPPLIER),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      googleId: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },

    { underscored: true }
  );
  User.associate = (models) => {
    User.hasOne(models.Client, {
      foreignKey: 'userId',
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    User.hasOne(models.Supplier, {
      foreignKey: 'userId',
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return User;
};
