const { PRODUCT_STATUS } = require('../../config/constants');
const {
  Product,
  Category,
  SubCategory,
  Promotion,
  Property,
  Supplier,
} = require('../../models');
const { Op } = require('sequelize');

exports.getApprovedProduct = async (req, res, next) => {
  try {
    const {
      searchText,
      page = 1,
      supplierId,
      categoryId,
      subcategoryId,
    } = req.query;
    const limit = 20;
    const offset = (page - 1) * limit;

    const whereOption = { status: PRODUCT_STATUS.APPROVED };
    if (supplierId) {
      whereOption.supplierId = supplierId;
    }
    if (searchText) {
      whereOption.productName = { [Op.like]: `%${searchText}%` };
    }
    if (categoryId) {
      whereOption.categoryId = categoryId;
    }
    if (subcategoryId) {
      whereOption.subCategoryId = subcategoryId;
    }

    const totalProduct = await Product.count({ where: whereOption });
    const products = await Product.findAll({
      where: whereOption,
      order: [['productName', 'ASC']],
      offset,
      limit,
      include: [
        { model: Category },
        { model: SubCategory },
        { model: Promotion },
        {
          model: Supplier,
          attributes: {
            exclude: ['password'],
          },
        },
      ],
    });
    const totalPage = Math.ceil(totalProduct / limit);
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
        { model: Promotion },
        { model: Category },
        { model: SubCategory },
        { model: Property },
        { model: Supplier },
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

exports.getApprovedProductByCategoryId = async (req, res, next) => {
  try {
    const { searchText, page = 1, supplierId } = req.query;
    const limit = 20;
    const offset = (page - 1) * limit;
    const { categoryId } = req.params;

    const whereOption = { status: PRODUCT_STATUS.APPROVED, categoryId };
    if (supplierId) {
      whereOption.supplierId = supplierId;
    }
    if (searchText) {
      whereOption.name = { [Op.like]: `%${searchText}%` };
    }
    const totalProduct = await Product.count({ where: whereOption });
    const products = await Product.findAll({
      where: whereOption,
      order: [['productName', 'ASC']],
      offset,
      limit,
      include: [
        { model: Category },
        { model: SubCategory },
        { model: Promotion },
      ],
    });

    const totalPage = Math.ceil(totalProduct / limit);
    res.status(200).json({
      message: 'Get product by category id successfully',
      products,
      totalPage,
    });
  } catch (err) {
    next(err);
  }
};

exports.getApprovedProductBySubCategoryId = async (req, res, next) => {
  try {
    const { searchText, page = 1, supplierId } = req.query;
    const limit = 20;
    const offset = (page - 1) * limit;
    const { subCategoryId } = req.params;

    const whereOption = { status: PRODUCT_STATUS.APPROVED, subCategoryId };
    if (supplierId) {
      whereOption.supplierId = supplierId;
    }
    if (searchText) {
      whereOption.name = { [Op.like]: `%${searchText}%` };
    }
    const totalProduct = await Product.count({ where: whereOption });
    const products = await Product.findAll({
      where: whereOption,
      order: [['productName', 'ASC']],
      offset,
      limit,
      include: [
        { model: Category },
        { model: SubCategory },
        { model: Promotion },
      ],
    });

    const totalPage = Math.ceil(totalProduct / limit);
    res.status(200).json({
      message: 'Get product by sub category id successfully',
      products,
      totalPage,
    });
  } catch (err) {
    next(err);
  }
};
