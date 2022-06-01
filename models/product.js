module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      mainPicture: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      subPicture1: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      subPicture2: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      subPicture3: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      subPicture4: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      property: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    { underscored: true }
  );

  Product.associate = (models) => {
    Product.hasMany(models.OrderItem, {
      foreignKey: {
        name: 'productId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    Product.hasMany(models.OrderItem, {
      foreignKey: {
        name: 'price',
        allowNull: false,
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    Product.belongsTo(models.Category, {
      foreignKey: {
        name: 'categoryId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    Product.belongsTo(models.SubCategory, {
      foreignKey: {
        name: 'subCategoryId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Product;
};
