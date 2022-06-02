const { IN_CART, PENDING, CONFIRMED } = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      paymentSlip: {
        type: DataTypes.STRING,
      },
      paymentDate: {
        type: DataTypes.DATE,
      },
      deliveryPrice: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM(IN_CART, PENDING, CONFIRMED),
        defaultValue: IN_CART,
        allowNull: false,
      },
      confirmedAdminId: {
        type: DataTypes.INTEGER,
      },
    },
    { underscored: true }
  );

  Order.associate = (models) => {
    Order.hasMany(models.OrderItem, {
      foreignKey: {
        name: 'orderId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    Order.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    Order.belongsTo(models.Admin, {
      foreignKey: {
        name: 'confirmedAdminId',
        allowNull: true,
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Order;
};
