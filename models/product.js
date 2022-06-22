const { PRODUCT_STATUS } = require('../config/constants');
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING(400),
    },

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    mainPicture: {
      type: DataTypes.STRING,
    },

    subPicture1: {
      type: DataTypes.STRING,
    },
    subPicture2: {
      type: DataTypes.STRING,
    },
    subPicture3: {
      type: DataTypes.STRING,
    },
    subPicture4: {
      type: DataTypes.STRING,
    },

    status: {
      type: DataTypes.ENUM(
        PRODUCT_STATUS.PENDING,
        PRODUCT_STATUS.APPROVED,
        PRODUCT_STATUS.REJECTED,
        PRODUCT_STATUS.HIDDEN
      ),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    rejectReason: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
  });

  Product.associate = (models) => {
    Product.hasMany(models.CartItems, {
      foreignKey: {
        name: 'productId',
        allowNull: false,
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    Product.hasMany(models.Promotion, {
      foreignKey: {
        name: 'productId',
        allowNull: false,
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    Product.hasMany(models.OrderItems, {
      foreignKey: {
        name: 'productId',
        allowNull: false,
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    Product.hasMany(models.Property, {
      foreignKey: {
        name: 'productId',
        allowNull: false,
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    Product.belongsTo(models.Supplier, {
      foreignKey: {
        name: 'supplierId',
        allowNull: false,
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    Product.belongsTo(models.Category, {
      foreignKey: {
        name: 'categoryId',
        allowNull: false,
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    Product.belongsTo(models.Subcategory, {
      foreignKey: {
        name: 'subCategoryId',
        allowNull: false,
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    Product.belongsTo(models.Admin, {
      foreignKey: {
        name: 'ChangeStatusAdminId',
        allowNull: true,
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  return Product;
};
