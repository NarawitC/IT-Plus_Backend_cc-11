const { SHIPPING_ORDER_STATUS } = require('../config/constants');
module.exports = (sequelize, DataTypes) => {
  const ShippingOrder = sequelize.define(
    'ShippingOrder',
    {
      status: {
        type: DataTypes.ENUM(
          SHIPPING_ORDER_STATUS.TO_SHIPPING_COMPANY,
          SHIPPING_ORDER_STATUS.TO_CLIENT,
          SHIPPING_ORDER_STATUS.DELIVERED
        ),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        defaultValue: SHIPPING_ORDER_STATUS.TO_SHIPPING_COMPANY,
      },

      //todo generate a unique id from frontend function
      trackingId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );
  ShippingOrder.associate = (models) => {
    ShippingOrder.belongsTo(models.PurchasedOrder, {
      foreignKey: {
        name: 'purchasedOrderId',
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
  };
  return ShippingOrder;
};
