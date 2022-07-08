module.exports = (sequelize, DataTypes) => {
  const Promotion = sequelize.define(
    'Promotion',
    {
      discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          isInt: true,
        },
      },
      startedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
          notEmpty: true,
        },
      },
      endedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );
  Promotion.associate = (models) => {
    Promotion.belongsTo(models.Product, {
      foreignKey: 'productId',
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Promotion;
};
