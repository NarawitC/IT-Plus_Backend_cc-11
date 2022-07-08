module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transaction',
    {
      description: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.ENUM('WITHDRAWAL', 'TRANSFER'),
      },
      fee: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      netAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('PENDING', 'COMPLETED'),
      },
    },
    {
      underscored: true,
      paranoid: true,
    }
  );
  Transaction.associate = (models) => {
    Transaction.belongsTo(models.PurchasedOrder, {
      foreignKey: {
        name: 'purchasedOrderId',
        allowNull: false,
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    Transaction.belongsTo(models.Supplier, {
      foreignKey: {
        name: 'supplierId',
        allowNull: false,
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };
  return Transaction;
};
