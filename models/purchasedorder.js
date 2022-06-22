import { PURCHASED_ORDER_STATUS } from '../config/constants';

module.exports = (sequelize, DataTypes) => {
  const PurchasedOrder = sequelize.define(
    'PurchasedOrder',
    {
      status: {
        type: DataTypes.ENUM,
        values: [
          PURCHASED_ORDER_STATUS.PENDING,
          PURCHASED_ORDER_STATUS.CONFIRMED,
        ],
        allowNull: false,
        defaultValue: PURCHASED_ORDER_STATUS.PENDING,
        validate: {
          notEmpty: true,
        },
      },
      paymentAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
          notEmpty: true,
        },
      },
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
  };
  return PurchasedOrder;
};
