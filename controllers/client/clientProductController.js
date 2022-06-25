const {
  Product,
  Category,
  SubCategory,
  Promotion,
  Property,
} = require('../../models');

exports.getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: [['productName', 'ASC']],
      include: [
        { model: Category },
        { model: SubCategory },
        { model: Property },
        { model: Promotion },
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
      message: 'Get product by id successfully',
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
      order: [['productName', 'ASC']],
      include: [{ model: Category }],
    });
    res.status(200).json({
      message: 'Get product by category id successfully',
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
      order: [['productName', 'ASC']],
      include: [{ model: SubCategory }],
    });
    res.status(200).json({
      message: 'Get product by sub category id successfully',
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
      order: [['productName', 'ASC']],
    });
    res.status(200).json({
      message: 'Get all product by search text successfully',
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
      order: [['productName', 'ASC']],
    });
    res.status(200).json({
      message: 'Get all product by brand successfully',
      products,
    });
  } catch (err) {
    next(err);
  }
};