module.exports = (sequelize, DataTypes) => {
  const SubCategory = sequelize.define(
    'SubCategory',
    {
      name: {
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
    SubCategory.hasMany(models.Product, {
      foreignKey: {
        name: 'subCategoryId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    SubCategory.belongsTo(models.Category, {
      foreignKey: {
        name: 'categoryId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return SubCategory;
};
