module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {}, { underscored: true });
  Cart.associate = (models) => {
    Cart.hasMany(models.CartItem, {
      foreignKey: 'cartId',
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Cart.belongsTo(models.Client, {
      foreignKey: 'clientId',
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Cart;
};
