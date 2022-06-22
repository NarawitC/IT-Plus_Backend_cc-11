module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    price: {
      type: DataTypes.INTIGER,
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
    description: DataTypes.STRING(400),

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    mainPicture: DataTypes.STRING,
    subPicture1: DataTypes.STRING,
    subPicture2: DataTypes.STRING,
    subPicture3: DataTypes.STRING,
    subPicture4: DataTypes.STRING,

    status: DataTypes.ENUM("PENDING", "APPROVED", "HIDDEN", "REJECT"),

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
        name: "productId",
        allowNull: false,
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    Product.hasMany(models.Promotion, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    Product.hasMany(models.OrderItems, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    Product.hasMany(models.Property, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    Product.belongsTo(models.Supplier, {
      foreignKey: {
        name: "supplierId",
        allowNull: false,
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    Product.belongsTo(models.Category, {
      foreignKey: {
        name: "categoryId",
        allowNull: false,
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    Product.belongsTo(models.Subcategory, {
      foreignKey: {
        name: "subCategoryId",
        allowNull: false,
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    Product.belongsTo(models.ChangeStatusAdmin, {
      foreignKey: {
        name: "ChangeStatusAdminId",
        allowNull: false,
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };

  return Product;
};
