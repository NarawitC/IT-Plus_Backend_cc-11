module.exports = (sequelize, DataTypes) => {
  const Subcategory = sequelize.define("subCategory", {
    subCategoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  Subcategory.associate = (models) => {
    Subcategory.belongsTo(models.Category, {
      foreignKey: {
        name: "CategoryId",
        allowNull: false,
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    Subcategory.hasOne(models.Product, {
      foreignKey: {
        name: "subCategoryId",
        allowNull: false,
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };
  return Subcategory;
};
