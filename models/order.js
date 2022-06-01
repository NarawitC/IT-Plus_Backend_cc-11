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
        type: DataTypes.ENUM(
          process.env.IN_CART,
          process.env.PENDING,
          process.env.CONFIRMED
        ),
        defaultValue: process.env.IN_CART,
        allowNull: false,
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
  };

  return Order;
};
