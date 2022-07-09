module.exports = (sequelize, DataTypes) => {
  const SubCategory = sequelize.define(
    'SubCategory',
    {
      subCategoryName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );

  SubCategory.associate = (models) => {
    SubCategory.belongsTo(models.Category, {
      foreignKey: {
        name: 'categoryId',
        allowNull: false,
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    SubCategory.hasMany(models.Product, {
      foreignKey: {
        name: 'subCategoryId',
        allowNull: false,
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };
  return SubCategory;
};
