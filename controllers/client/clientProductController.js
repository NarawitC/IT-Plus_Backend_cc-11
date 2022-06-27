const { PRODUCT_STATUS } = require('../../config/constants');
const {
  Product,
  Category,
  SubCategory,
  Promotion,
  Property,
} = require('../../models');
const { Op } = require('sequelize');

exports.getApprovedProduct = async (req, res, next) => {
  try {
    const { searchText = '', page = 1, supplierId = true } = req.query;
    const limit = 20;
    const offset = (page - 1) * limit;

    const products = await Product.findAll({
      where: {
        productName: { [Op.like]: `%${searchText}%` },
        status: PRODUCT_STATUS.APPROVED,
        supplierId,
      },
      order: [['productName', 'ASC']],
      offset,
      limit,
      include: [
        { model: Category },
        { model: SubCategory },
        { model: Promotion },
      ],
    });

    const totalPage = Math.ceil(products.length / limit);
    res.status(200).json({
      message: 'Get all approved product successfully',
      products,
      totalPage,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({
      where: { id: productId },
      include: [
        {
          model: Promotion,
        },
      ],
    });
    res.status(200).json({
      message: 'Get product by id successfully',
      product,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProductByCategoryId = async (req, res, next) => {
  try {
    const { searchText = '', page = 1, supplierId = true } = req.query;
    const limit = 20;
    const offset = (page - 1) * limit;

    const { categoryId } = req.params;
    const products = await Product.findAll({
      where: {
        productName: { [Op.like]: `%${searchText}%` },
        status: PRODUCT_STATUS.APPROVED,
        categoryId,
        supplierId,
      },
      order: [['productName', 'ASC']],
      offset,
      limit,
      include: [
        { model: Category },
        { model: SubCategory },
        { model: Promotion },
      ],
    });

    const totalPage = Math.ceil(products.length / limit);
    res.status(200).json({
      message: 'Get product by category id successfully',
      products,
      totalPage,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProductBySubCategoryId = async (req, res, next) => {
  try {
    const { searchText = '', page = 1, supplierId = true } = req.query;
    const limit = 20;
    const offset = (page - 1) * limit;

    const { subCategoryId } = req.params;
    const products = await Product.findAll({
      where: {
        productName: { [Op.like]: `%${searchText}%` },
        status: PRODUCT_STATUS.APPROVED,
        subCategoryId,
        supplierId,
      },
      order: [['productName', 'ASC']],
      offset,
      limit,
      include: [
        { model: Category },
        { model: SubCategory },
        { model: Promotion },
      ],
    });

    const totalPage = Math.ceil(products.length / limit);
    res.status(200).json({
      message: 'Get product by sub category id successfully',
      products,
      totalPage,
    });
  } catch (err) {
    next(err);
  }
}
