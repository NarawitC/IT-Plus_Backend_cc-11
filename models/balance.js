module.exports = (sequelize, DataTypes) => {
  const Balance = sequelize.define(
    'Balance',
    {
      balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      underscored: true,
      paranoid: true,
    }
  );
  Balance.associate = (models) => {
    Balance.belongsTo(models.Supplier, {
      foreignKey: {
        name: 'supplierId',
        allowNull: false,
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };
  return Balance;
};
