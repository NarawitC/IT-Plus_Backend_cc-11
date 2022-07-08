module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    'OrderItem',
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          isInt: true,
        },
      },
      promotionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        validate: {
          isInt: true,
        },
      },
    },
    { underscored: true }
  );
  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, {
      foreignKey: 'orderId',
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    OrderItem.belongsTo(models.Product, {
      foreignKey: 'productId',
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return OrderItem;
};
