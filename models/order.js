module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      productPice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      deliveryAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      deliveryPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );
  Order.associate = (models) => {
    Order.hasMany(models.OrderItems, {
      foreignKey: 'orderId',
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Order.hasOne(models.PurchasedOrder, {
      foreignKey: 'orderId',
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    Order.belongsTo(models.Client, {
      foreignKey: 'clientId',
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Order;
};
