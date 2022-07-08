const { PRODUCT_STATUS } = require('../../config/constants');
const {
  Product,
  Category,
  SubCategory,
  Promotion,
  Property,
  Supplier,
} = require('../../models');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

exports.getApprovedProductSupplierList = async (req, res, next) => {
  try {
    const { searchText = '', supplierId = true } = req.query;

    const products = await Product.findAll({
      where: {
        productName: { [Op.like]: `%${searchText}%` },
        status: PRODUCT_STATUS.APPROVED,
        supplierId,
      },
      include: [{ model: Supplier }],
      group: ['Product.supplier_id'],
      attributes: [
        '*',
        [
          Sequelize.fn('COUNT', Sequelize.col('Product.supplier_id')),
          'productCount',
        ],
      ],
    });

    res.status(200).json({
      message: 'Get approved product supplier list successfully',
      products,
    });
  } catch (err) {
    next(err);
  }
};

exports.getApprovedProductByCategoryIdSupplierList = async (req, res, next) => {
  try {
    const { searchText = '', supplierId = true } = req.query;

    const { categoryId } = req.params;
    const products = await Product.findAll({
      where: {
        categoryId,
        productName: { [Op.like]: `%${searchText}%` },
        status: PRODUCT_STATUS.APPROVED,
        supplierId,
      },
      include: [{ model: Supplier }],
      group: ['Product.supplier_id'],
      attributes: [
        '*',
        [
          Sequelize.fn('COUNT', Sequelize.col('Product.supplier_id')),
          'productCount',
        ],
      ],
    });

    res.status(200).json({
      message: 'Get approved product by category id supplier list successfully',
      products,
    });
  } catch (err) {
    next(err);
  }
};

exports.getApprovedProductBySubCategoryIdSupplierList = async (
  req,
  res,
  next
) => {
  try {
    const { searchText = '', supplierId = true } = req.query;

    const { subCategoryId } = req.params;
    const products = await Product.findAll({
      where: {
        subCategoryId,
        productName: { [Op.like]: `%${searchText}%` },
        status: PRODUCT_STATUS.APPROVED,
        supplierId,
      },
      include: [{ model: Supplier }],
      group: ['Product.supplier_id'],
      attributes: [
        '*',
        [
          Sequelize.fn('COUNT', Sequelize.col('Product.supplier_id')),
          'productCount',
        ],
      ],
    });

    res.status(200).json({
      message: 'Get product by sub category id supplier list successfully',
      products,
    });
  } catch (err) {
    next(err);
  }
};
