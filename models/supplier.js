module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define(
    'Supplier',
    {
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.STRING(400),
      },
      profilePicture: {
        type: DataTypes.STRING,
      },
      lineId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      bankName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      bankAccount: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );
  Supplier.associate = (models) => {
    Supplier.hasMany(models.Product, {
      foreignKey: 'supplierId',
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Supplier.hasMany(models.Order, {
      foreignKey: 'supplierId',
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Supplier.belongsTo(models.User, {
      foreignKey: 'userId',
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Supplier.hasOne(models.Balance, {
      foreignKey: 'supplierId',
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Supplier.hasMany(models.Transaction, {
      foreignKey: 'supplierId',
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Supplier;
};
