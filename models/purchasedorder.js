const { PURCHASED_ORDER_STATUS } = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  const PurchasedOrder = sequelize.define(
    'PurchasedOrder',
    {
      paymentAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
          notEmpty: true,
        },
      },

      // Todo wait for omise research
      transactionId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );
  PurchasedOrder.associate = (models) => {
    PurchasedOrder.hasOne(models.ShippingOrder, {
      foreignKey: 'purchasedOrderId',
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    PurchasedOrder.belongsTo(models.Order, {
      foreignKey: 'orderId',
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    PurchasedOrder.hasOne(models.Transaction, {
      foreignKey: 'purchasedOrderId',
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return PurchasedOrder;
};
