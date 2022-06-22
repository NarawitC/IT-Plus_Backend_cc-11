module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    'OrderItem',
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          notEmpty: true,
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
    OrderItem.belongsTo(models.Promotion, {
      foreignKey: 'promotionId',
      allowNull: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return OrderItem;
};
