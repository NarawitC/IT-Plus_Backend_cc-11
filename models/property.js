module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define("Property", {
    topic: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
  });
  Property.associate = (models) => {
    Property.belongsTo(models.Product, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };
  return Property;
};
