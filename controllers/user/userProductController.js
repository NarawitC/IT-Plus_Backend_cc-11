const { Product, Category, SubCategory, Promotion } = require('../../models');
const { Op } = require('sequelize');

exports.getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: [['name', 'ASC']],
      include: [
        {
          model: Promotion,
        },
      ],
    });
    res.status(200).json({
      message: 'Get all product successfully',
      products,
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
      message: 'Get product successfully',
      product,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProductByCategoryId = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.findAll({
      where: { categoryId },
      order: [['name', 'ASC']],
      include: [{ model: Category }],
    });
    res.status(200).json({
      message: 'Get all product successfully',
      products,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProductBySubCategoryId = async (req, res, next) => {
  try {
    const { subCategoryId } = req.params;
    const products = await Product.findAll({
      where: { subCategoryId },
      order: [['name', 'ASC']],
      include: [{ model: SubCategory }],
    });
    res.status(200).json({
      message: 'Get all product successfully',
      products,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProductBySearchText = async (req, res, next) => {
  try {
    const { searchText } = req.params;
    const products = await Product.findAll({
      where: { productName: { [Op.like]: `%${searchText}%` } },
      order: [['name', 'ASC']],
    });
    res.status(200).json({
      message: 'Get all product by text successfully',
      products,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProductByBrand = async (req, res, next) => {
  try {
    const { searchBrand } = req.params;
    const products = await Product.findAll({
      where: { brand: { [Op.like]: `%${searchBrand}%` } },
      order: [['name', 'ASC']],
    });
    res.status(200).json({
      message: 'Get all product by brand successfully',
      products,
    });
  } catch (err) {
    next(err);
  }
};
